import type { ComponentProps } from "react";

export type ButtonVariant =
  | "yellow" // galben cu text negru – pe negru sau alb
  | "black" // negru cu text alb – pe galben sau alb
  | "white" // alb cu text negru – pe negru
  | "outline-light" // contur alb – pe negru
  | "outline-dark"; // contur negru – pe galben sau alb

const variants: Record<ButtonVariant, string> = {
  yellow: "bg-yellow text-black hover:bg-pure-white",
  black: "bg-black text-pure-white hover:bg-gray-900",
  white: "bg-pure-white text-black hover:bg-yellow",
  "outline-light":
    "border border-pure-white text-pure-white hover:bg-pure-white hover:text-black",
  "outline-dark":
    "border-2 border-black text-black hover:bg-black hover:text-pure-white",
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-pill px-6 py-3 font-semibold transition-colors duration-200";

export function buttonClasses(variant: ButtonVariant = "yellow", extra = "") {
  return `${base} ${variants[variant]} ${extra}`.trim();
}

type ButtonLinkProps = ComponentProps<"a"> & { variant?: ButtonVariant };

export function ButtonLink({
  variant = "yellow",
  className = "",
  ...props
}: ButtonLinkProps) {
  return <a className={buttonClasses(variant, className)} {...props} />;
}

type ButtonProps = ComponentProps<"button"> & { variant?: ButtonVariant };

export function Button({
  variant = "yellow",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses(variant, className)}
      {...props}
    />
  );
}
