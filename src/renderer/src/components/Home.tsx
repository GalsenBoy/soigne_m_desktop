/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
import { Button } from '@renderer/assets/ui/button'
import AvisType from '@renderer/types/avis.type'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
export default function Home(): JSX.Element {
  const [avisData, setAvisData] = useState<AvisType[]>([])
  const navigate = useNavigate()

  const handleLogout = (): void => {
    Cookies.remove('accessToken')
    navigate('/')
  }
  const getAvis = async () => {
    try {
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
      setAvisData(data)
    } catch (error) {
      console.error('Error getting avis:', error)
    }
  }

  useEffect(() => {
    getAvis()
  }, [])

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">
        Bienvenue sur votre logiciel Soigne Moi
      </h1>
      <Button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-8"
        onClick={handleLogout}
      >
        Se déconnecter
      </Button>
      <div>
        {avisData.map((avis) => (
          <div key={avis.id} className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold">
              Dr - {avis.medecin.lastName} {avis.medecin.firstName} / {avis.medecin.specialite}
            </h2>

            <div className="mt-4">
              <p className="mb-2">
                Date d'entrée : <span className="font-medium">{avis.sejour.dateEntree}</span>
              </p>
              <p className="mb-4">
                Date de sortie : <span className="font-medium">{avis.sejour.dateSortie}</span>
              </p>
              <h2 className="text-xl font-semibold">
                Patient : {avis.user.firstName} {avis.user.lastName}
              </h2>
            </div>
            <h3 className="mt-4 mb-2">Motif : {avis.sejour.motif}</h3>
            <div>
              <h2>
                Avis du médecin : <span className="font-normal">{avis.description}</span>
              </h2>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Médicaments Prescrits :</h2>
              <ul>
                {avis.prescription?.medecament.map((med) => (
                  <li key={med.id} className="border-b border-gray-200 py-2">
                    <h3 className="text-md font-semibold mb-1">{med.medicament}</h3>
                    <p className="text-sm text-gray-600">{med.posologie}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
