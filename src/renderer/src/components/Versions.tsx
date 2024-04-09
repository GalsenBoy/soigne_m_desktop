import { useState } from 'react'
import { Link } from 'react-router-dom'

function Versions(): JSX.Element {
  const [versions] = useState(window.electron.process.versions)

  return (
    <ul className="versions">
      <li className="electron-version">Electron v{versions.electron}</li>
      <li className="chrome-version">Chromium v{versions.chrome}</li>
      <li className="node-version">Node v{versions.node}</li>
      <Link to="/login">Login</Link>
    </ul>
  )
}

export default Versions
