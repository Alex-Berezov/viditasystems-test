import { IDocuments } from "../types/Types"
import { instance } from "./api"

export const documents1API = {
  getDocuments1() {
    return instance.get<IDocuments[]>('documents1').then(res => res.data)
  }
}