import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}

export function Container({ children, className = "", size = "default" }: ContainerProps) {
  const maxWidth = {
    default: "max-w-7xl",
    narrow: "max-w-4xl",
    wide: "max-w-[1440px]",
  }[size];

  return (
    <div className={`w-full ${maxWidth} mx-auto px-6 ${className}`}>
      {children}
    </div>
  );
}
