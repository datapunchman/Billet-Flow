// The Mandrok "jaw" glyph — identical geometry to the mark used on the
// marketing site (Logo/mandrok-experience/index-final.html). Kept as a
// standalone component so every admin surface renders the exact same mark.
export function MandrokMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 188 168"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g fill="currentColor">
        <polygon points="25.00,21.00 25.00,122.00 48.00,147.00 56.00,147.00 57.00,110.00 71.00,104.00 71.00,70.00" />
        <polygon points="162.00,21.00 118.00,72.00 118.00,102.00 133.00,110.00 133.00,147.00 141.00,147.00 163.00,124.00" />
      </g>
    </svg>
  );
}
