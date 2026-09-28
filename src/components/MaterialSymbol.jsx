/**
 * Material Symbols Outlined wrapper.
 * Renders the ligature name as text and lets the icon font do the rest.
 */
export default function MaterialSymbol({ name, className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined select-none leading-none ${className}`}
    >
      {name}
    </span>
  )
}
