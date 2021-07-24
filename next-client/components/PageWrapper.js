const PageWrapper = ({ children }) => {
  return (
    <main className="w-screen px-8">
      <div className="max-w-xl mx-auto pb-20">
        {children}
      </div>
    </main>
  )
}

export default PageWrapper
