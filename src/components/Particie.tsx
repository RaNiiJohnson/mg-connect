"use client";

import { useTheme } from "next-themes";
import { Particles } from "./ui/particles";

function Particie() {
  const { resolvedTheme } = useTheme();
  const color = resolvedTheme === "dark" ? "#ffffff" : "#000000";

  return (
    <div>
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color={color}
        refresh={true}
      />
    </div>
  );
}

export default Particie;
