import { IDocuments } from "../types/Types"
import { instance } from "./api"

export const documents2API = {
  async getDocuments2() {
    const res = await instance.get<IDocuments[]>('documents2')
    return res.data
  }
}