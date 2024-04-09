/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom'

/* eslint-disable prettier/prettier */
export default function Home(): JSX.Element {
  return (
    <h1>
      La page d'accueil <Link to={'/login'}>co</Link>
    </h1>
  )
}
