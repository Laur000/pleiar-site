import Link from "next/link";

// Pagina principală se construiește în Etapa 3 (vezi PLAN.md).
// Până atunci, design system-ul se verifică la /style.
export default function Home() {
  return (
    <main className="container-site section-y">
      <Link href="/style" className="eyebrow text-yellow underline">
        /style
      </Link>
    </main>
  );
}
