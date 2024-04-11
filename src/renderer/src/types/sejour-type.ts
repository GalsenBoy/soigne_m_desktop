/* eslint-disable prettier/prettier */
import MedecinType from './medecin-type'
import { Specialite } from './specialite-type'
import UserType from './user-type'

export default interface SejourType {
  id: string
  dateEntree: string
  dateSortie: string
  motif: string
  specialite: Specialite
  medecin: MedecinType | null
  user: UserType
}
