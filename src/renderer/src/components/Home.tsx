/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
import { Button } from '@renderer/assets/ui/button'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useNavigate } from 'react-router'
export default function Home(): JSX.Element {
  const [sejours, setSejours] = useState([])
  const navigate = useNavigate()

  const handleLogout = (): void => {
    Cookies.remove('accessToken')
    navigate('/')
  }
  const getAvis = async () => {
    const token = Cookies.get('accessToken')
    if (!token) {
      navigate('/')
    }
    const response = await fetch('http://localhost:8000/avis', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (!response.ok) {
      navigate('/')
    }
    const data = await response.json()
  }
  return (
    <section>
      <h1>La page d'accueil</h1>
      <Button className="bg-red-500" onClick={handleLogout}>
        Se déconnecter
      </Button>
    </section>
  )
}
