/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */

import { Button } from '@renderer/assets/ui/button'
import { Input } from '@renderer/assets/ui/input'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

type Inputs = {
  firstName: string
  lastName: string
  email: string
  password: string
  zipCode: string
}

export default function Register(): JSX.Element {
  const [error, setError] = useState(null)
  const route = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch('http://localhost:8000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        throw new Error('Unable to register user')
      }
      route('/')
      console.log('User registered successfully')
    } catch (error: any) {
      setError(error.message)
      // console.error("Error registering user:", error);
    }
  }

  return (
    <section>
      <h1 className="text-center text-2xl my-10">S'inscrire</h1>
      <div className=" max-w-screen-xl mx-auto my-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Prénom"
            className="mb-4 "
            {...register('firstName', { required: true })}
          />
          {errors.firstName && <p className="text-red-500">Ce champ est requis</p>}
          <Input
            placeholder="Nom"
            className="mb-4 "
            {...register('lastName', { required: true })}
          />
          <Input
            placeholder="Email"
            className="mb-4 "
            type="email"
            {...register('email', { required: true })}
          />
          {errors.email && <p className="text-red-500">Ce champ est requis</p>}
          <Input
            placeholder="Mot de passe"
            className="mb-4 "
            type="password"
            {...register('password', { required: true })}
          />
          {errors.password && <p className="text-red-500">Ce champ est requis</p>}
          <Input
            placeholder="Code postal"
            className="mb-4 "
            {...register('zipCode', { required: true })}
          />
          {errors.zipCode && <p className="text-red-500">Ce champ est requis</p>}

          <Button
            className="bg-sky-500 hover:text-sky-500 hover:bg-white border border-sky-500 mt-4 "
            type="submit"
          >
            S'INSCRIRE
          </Button>
          <Link to="/" className="ml-6 underline underline-offset-2">
            Se connecter
          </Link>
        </form>
      </div>
      {error && <p className="text-red-500">{error}</p>}{' '}
    </section>
  )
}
