import { cn } from "@/app/lib/utils";

/** Concentric rings, drawn with the current text colour. */
export function Rings({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden="true"
      className={cn("pointer-events-none fill-none stroke-current", className)}
    >
      {[60, 105, 150, 198].map((r) => (
        <circle
          key={r}
          cx="200"
          cy="200"
          r={r}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

/** A patch of dots that fades out towards its edges. */
export function DotGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none bg-[radial-gradient(currentColor_1.5px,transparent_1.5px)] [background-size:18px_18px] [mask-image:radial-gradient(closest-side,black,transparent)]",
        className,
      )}
    />
  );
}
