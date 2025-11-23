import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("relative w-8 h-8", className)}>
      <Image
        src="/images/hallo-logo.png"
        alt="Hallo Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
