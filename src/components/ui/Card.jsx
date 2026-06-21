export function Tile({ icon: Icon, title, text, number, className = '' }) {
  return (
    <div
      className={`svc-tile group bg-deep p-7 sm:p-9 hover:bg-white/[0.02] transition-colors duration-500 relative ${className}`}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="h-12 w-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
          <Icon className="h-5 w-5 text-primary group-hover:text-deep" strokeWidth={2} />
        </div>
        <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
          {number}
        </span>
      </div>
      <h3 className="font-display font-bold text-xl sm:text-2xl mb-3">{title}</h3>
      <p className="text-white/55 text-sm leading-relaxed">{text}</p>
    </div>
  )
}
