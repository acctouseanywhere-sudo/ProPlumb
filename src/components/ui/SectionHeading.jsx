export function SectionHeadingLight({ eyebrow, title, titleAccent, description, className = '' }) {
  return (
    <div className={className}>
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
        ╱ {eyebrow}
      </span>
      <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl mt-4 leading-[1.05] tracking-tight">
        {title}
        <span className="block font-serif italic font-medium text-primary">
          {titleAccent}
        </span>
      </h2>
      {description && (
        <p className="text-white/60 max-w-md text-base leading-relaxed mt-4">{description}</p>
      )}
    </div>
  )
}
