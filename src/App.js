import React, {useState, useEffect} from 'react'
import Editor from './components/Editor'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
      </html>
    `)
    }, 350)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
      <div className="pane pane__top">
        <Editor language="xml" name="HTML" value={html} onChange={setHtml} />
        <Editor language="css" name="CSS" value={css} onChange={setCss} />
        <Editor language="javascipt" name="JS" value={js} onChange={setJs} />
      </div>
      <div className="pane">
        <iframe 
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}

export default App;
