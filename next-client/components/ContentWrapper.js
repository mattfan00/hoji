const ContentWrapper = ({ 
  children,
  size = "2xl"
}) => {
  return (
    <main className="w-screen px-8">
      <div className="max-w-6xl mx-auto">
        <div className={`max-w-${size} pb-20`}>
          {children}
        </div>
      </div>
    </main>
  )
}

export default ContentWrapper
