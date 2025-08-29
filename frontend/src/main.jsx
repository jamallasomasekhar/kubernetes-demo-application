import React from 'react'
import { createRoot } from 'react-dom/client'

function App() {
  const [data, setData] = React.useState(null)
  const [err, setErr] = React.useState(null)

  async function callApi() {
    try {
      const res = await fetch('/api')
      const json = await res.json()
      setData(json)
    } catch (e) {
      setErr(e.message || String(e))
    }
  }

  React.useEffect(() => {
    callApi()
  }, [])

  return (
    <div style={{fontFamily:'system-ui, sans-serif', padding:20}}>
      <h1>Demo Frontend</h1>
      <p>This page calls <code>/api</code> and shows DB time.</p>
      <button onClick={callApi} style={{padding:'8px 12px'}}>Refresh</button>
      <pre style={{background:'#111', color:'#dfdfdf', padding:12, marginTop:12}}>
        {err ? `Error: ${err}` : JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
