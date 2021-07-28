const ContentWrapper = ({ children }) => {
  return (
    <main className="w-screen px-8 pt-16">
      <div className="max-w-2xl mx-auto pb-20">
        {children}
      </div>
    </main>
  )
}

export default ContentWrapper
