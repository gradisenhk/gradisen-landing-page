function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary">{title}</h2>
      <span aria-hidden="true" className="mx-auto mt-4 block h-1 w-12 rounded-full bg-brand-primary" />
      {subtitle && (
        <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-text-secondary">{subtitle}</p>
      )}
    </div>
  )
}

export default SectionTitle
