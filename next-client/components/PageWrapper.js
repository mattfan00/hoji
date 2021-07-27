const PageWrapper = ({ children }) => {
  return (
    <div className="w-screen px-8 pt-12">
      <div className="max-w-2xl mx-auto pb-20">
        {children}
      </div>
    </div>
  )
}

export default PageWrapper
