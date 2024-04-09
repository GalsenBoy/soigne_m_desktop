/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */
import Cookies from 'js-cookie'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../assets/ui/button'
import { Input } from '../../assets/ui/input'

export default function SignIn(): JSX.Element {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const route = useNavigate()
  const [error, setError] = useState(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:8000/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message)
      }
      const data = await response.json()
      const token = data.access_token

      Cookies.set('accessToken', token)
      route('/home')
    } catch (error: any) {
      setError(error.message)
      console.error('Error signing in:', error)
    }
  }

  return (
    <section className="">
      <h1 className="text-2xl text-center my-10 text-sky-400 ">Se connecter</h1>
      <div className="max-w-screen-xl mx-auto my-4">
        <form onSubmit={handleSubmit} className="text-white">
          <Input
            className="mb-4 "
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            className="mt-4"
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex mt-5 items-center justify-between">
            <Button className=" bg-sky-500 hover:text-sky-500 hover:bg-white" type="submit">
              SE CONNECTER
            </Button>
            <Link className="underline underline-offset-2 text-xl text-black" to={'/register'}>
              S'incrire
            </Link>
          </div>
        </form>
      </div>
      {error && <p className="text-red-500">{error}</p>}{' '}
    </section>
  )
}
