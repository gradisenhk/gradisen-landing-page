function SectionHeader({ index, label, title, lede }) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      <p className="eyebrow lg:col-span-3">
        {index} — {label}
      </p>
      <div className="lg:col-span-9">
        <h2 className="text-headline font-semibold text-ink">{title}</h2>
        {lede && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{lede}</p>}
      </div>
    </div>
  )
}

export default SectionHeader
