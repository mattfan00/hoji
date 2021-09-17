const Section = ({
  children,
  title,
  description
}) => {
  return (
    <div className="mb-20">
      <div className="mb-6"> 
        <h2>{title}</h2>
        {description ? (
        <div className="mt-2 text-sm max-w-xl">{description}</div>
        ) : ""}
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Section
