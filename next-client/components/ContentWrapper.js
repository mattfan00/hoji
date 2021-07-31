const ContentWrapper = ({ 
  children,
  size = "2xl"
}) => {
  return (
    <main className="w-screen px-8 pt-16">
      <div className={`max-w-${size} mx-auto pb-20`}>
        {children}
      </div>
    </main>
  )
}

export default ContentWrapper
