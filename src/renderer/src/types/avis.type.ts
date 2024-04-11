/* eslint-disable prettier/prettier */

import MedecinType from './medecin-type'
import { PrescriptionType } from './prescription.type'
import SejourType from './sejour-type'
import UserType from './user-type'

export default interface AvisType {
  id: string
  avis: string
  description: string
  medecin: MedecinType
  prescription: PrescriptionType
  user: UserType
  sejour: SejourType
}
