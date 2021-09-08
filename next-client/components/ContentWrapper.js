const ContentWrapper = ({ 
  children,
  size = "2xl"
}) => {
  const sizeMap = {
    "sm": "max-w-sm",
    "2xl": "max-w-2xl",
  }

  return (
    <main className="w-screen px-8">
      <div className={`${sizeMap[size]} mx-auto  pb-20`}>
        {children}
      </div>
    </main>
  )
}

export default ContentWrapper
