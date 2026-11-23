# Convertește clipurile originale din public/raw/ în variante pentru web.
#
#   npm run videos            (sau: powershell -ExecutionPolicy Bypass -File scripts/convert-videos.ps1)
#   npm run videos -- -Force  (refă tot, chiar dacă există deja)
#
# Pentru fiecare clip „nume.mp4” din public/raw/:
#   - clip vertical (client):
#       public/videos/nume.mp4      preview pentru card: 720p, fără sunet, sub 3 MB
#       public/videos/nume-hd.mp4   versiunea pe tot ecranul: 1080p, cu sunet
#       public/posters/nume.webp    coperta (primul cadru)
#   - showreel (orice fișier care începe cu „showreel”):
#       public/videos/showreel.mp4  1080p, cu sunet (pornește mut, sunetul din buton)
#       public/posters/showreel.webp
#
# Toate au „faststart”: informațiile de redare sunt la începutul fișierului,
# deci clipul pornește imediat, fără să aștepte descărcarea întregului fișier.

param([switch]$Force)
$ErrorActionPreference = "Stop"

# ffmpeg instalat cu winget e în PATH-ul utilizatorului; îl reîncărcăm ca să fie găsit și în terminale vechi.
$env:Path = [Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [Environment]::GetEnvironmentVariable("Path", "User")
if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
  throw "Nu găsesc ffmpeg. Instalează-l cu: winget install Gyan.FFmpeg"
}

$root = Split-Path $PSScriptRoot -Parent
$raw = Join-Path $root "public/raw"
$videos = Join-Path $root "public/videos"
$posters = Join-Path $root "public/posters"
New-Item -ItemType Directory -Force $videos, $posters | Out-Null

# Limite
$PreviewMaxBytes = 2.8MB      # sub 3 MB (CLAUDE.md), cu marjă
$PreviewMaxSeconds = 20       # preview-ul din card nu are nevoie de tot clipul
$HdMaxRate = "5M"             # 1080p pentru web: calitate bună, pornește repede

# Latura scurtă devine N px (merge și pentru vertical, și pentru orizontal).
function Get-ScaleFilter([int]$short) {
  "scale='if(gt(iw,ih),-2,min($short,iw))':'if(gt(iw,ih),min($short,ih),-2)'"
}

function Test-UpToDate([string]$src, [string[]]$outs) {
  if ($Force) { return $false }
  $srcTime = (Get-Item $src).LastWriteTimeUtc
  foreach ($o in $outs) {
    if (-not (Test-Path $o) -or (Get-Item $o).LastWriteTimeUtc -lt $srcTime) { return $false }
  }
  return $true
}

function Invoke-Ffmpeg([string[]]$ffArgs) {
  & ffmpeg -hide_banner -loglevel error -y @ffArgs
  if ($LASTEXITCODE -ne 0) { throw "ffmpeg a eșuat: $($ffArgs -join ' ')" }
}

function Write-Poster([string]$src, [string]$out) {
  Invoke-Ffmpeg @("-ss", "0.5", "-i", $src, "-frames:v", "1", "-vf", (Get-ScaleFilter 720), "-c:v", "libwebp", "-quality", "80", $out)
}

function Write-Hd([string]$src, [string]$out) {
  Invoke-Ffmpeg @(
    "-i", $src,
    "-vf", (Get-ScaleFilter 1080),
    "-c:v", "libx264", "-preset", "slow", "-crf", "23", "-maxrate", $HdMaxRate, "-bufsize", "10M",
    "-pix_fmt", "yuv420p", "-profile:v", "high",
    "-c:a", "aac", "-b:a", "128k",
    "-movflags", "+faststart", $out
  )
}

function Write-Preview([string]$src, [string]$out) {
  $duration = [double](& ffprobe -v error -show_entries format=duration -of csv=p=0 $src)
  $seconds = [math]::Min($duration, $PreviewMaxSeconds)
  # Bitrate calculat din durată, ca fișierul să încapă sub limită.
  $kbps = [math]::Floor(($PreviewMaxBytes * 8 / 1000) / $seconds * 0.92)
  $kbps = [math]::Min($kbps, 1500)
  Invoke-Ffmpeg @(
    "-i", $src, "-t", "$seconds",
    "-vf", (Get-ScaleFilter 720),
    "-c:v", "libx264", "-preset", "slow", "-b:v", "${kbps}k", "-maxrate", "${kbps}k", "-bufsize", "$($kbps * 2)k",
    "-pix_fmt", "yuv420p", "-profile:v", "high",
    "-an", "-movflags", "+faststart", $out
  )
}

$files = Get-ChildItem $raw -File | Where-Object { $_.Extension -match '^\.(mp4|mov|m4v)$' }
if (-not $files) { Write-Host "Nu e niciun clip în public/raw/."; exit 0 }

foreach ($f in $files) {
  $name = $f.BaseName.ToLowerInvariant()
  $poster = Join-Path $posters "$name.webp"

  if ($name.StartsWith("showreel")) {
    $out = Join-Path $videos "showreel.mp4"
    $poster = Join-Path $posters "showreel.webp"
    if (Test-UpToDate $f.FullName @($out, $poster)) { Write-Host "= $($f.Name) (deja convertit)"; continue }
    Write-Host "> $($f.Name): showreel 1080p + copertă..."
    Write-Hd $f.FullName $out
    Write-Poster $f.FullName $poster
    $outs = @($out, $poster)
  }
  else {
    $preview = Join-Path $videos "$name.mp4"
    $hd = Join-Path $videos "$name-hd.mp4"
    if (Test-UpToDate $f.FullName @($preview, $hd, $poster)) { Write-Host "= $($f.Name) (deja convertit)"; continue }
    Write-Host "> $($f.Name): preview 720p + HD 1080p + copertă..."
    Write-Preview $f.FullName $preview
    Write-Hd $f.FullName $hd
    Write-Poster $f.FullName $poster
    $outs = @($preview, $hd, $poster)
  }

  foreach ($o in $outs) {
    Write-Host ("    {0,-22} {1,6:N1} MB" -f (Split-Path $o -Leaf), ((Get-Item $o).Length / 1MB))
  }
}
Write-Host "Gata."
