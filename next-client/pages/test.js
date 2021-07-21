export default function Test({ entries}) {
  return (
    <div>
      {entries.map((entry) => (
        <div key={entry.id}>{entry.id}</div>
      ))} 
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:8080/entry/list?cursor=0")
  const data = await res.json()

  return {
    props: {
      entries: data.entries
    }
  }
}
