/* eslint-disable prettier/prettier */
import { Medecament } from './medecament.type'

export interface PrescriptionType {
  id: string
  date: Date
  medecament: Medecament[]
}
