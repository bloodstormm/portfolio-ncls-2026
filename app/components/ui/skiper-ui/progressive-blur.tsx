/**
 * ProgressiveBlur from Skiper UI "skiper41" (https://skiper-ui.com), by @gurvinder-singh02.
 * A strip that fades from a colour to transparent while the backdrop blur fades out with it.
 * Free version: attribution to Skiper UI kept here.
 */
type ProgressiveBlurProps = {
  className?: string;
  backgroundColor?: string;
  position?: "top" | "bottom";
  height?: string;
  blurAmount?: string;
};

export function ProgressiveBlur({
  className = "",
  backgroundColor = "#f5f4f3",
  position = "top",
  height = "150px",
  blurAmount = "4px",
}: ProgressiveBlurProps) {
  const isTop = position === "top";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 w-full select-none ${className}`}
      style={{
        [isTop ? "top" : "bottom"]: 0,
        height,
        background: isTop
          ? `linear-gradient(to top, transparent, ${backgroundColor})`
          : `linear-gradient(to bottom, transparent, ${backgroundColor})`,
        maskImage: isTop
          ? "linear-gradient(to bottom, #000 50%, transparent)"
          : "linear-gradient(to top, #000 50%, transparent)",
        WebkitMaskImage: isTop
          ? "linear-gradient(to bottom, #000 50%, transparent)"
          : "linear-gradient(to top, #000 50%, transparent)",
        WebkitBackdropFilter: `blur(${blurAmount})`,
        backdropFilter: `blur(${blurAmount})`,
      }}
    />
  );
}
