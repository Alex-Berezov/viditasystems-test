import { IDocuments } from "../types/Types"
import { instance } from "./api"

export const documents2API = {
  getDocuments2() {
    return instance.get<IDocuments[]>('documents2').then(res => res.data)
  }
}