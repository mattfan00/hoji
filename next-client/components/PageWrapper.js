const PageWrapper = ({ children }) => {
  return (
    <main className="w-screen px-8">
      <div className="max-w-2xl mx-auto pb-20">
        {children}
      </div>
    </main>
  )
}

export default PageWrapper
