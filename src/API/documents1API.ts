import { IDocuments } from "../types/Types"
import { instance } from "./api"

export const documents1API = {
  async getDocuments1() {
    const res = await instance.get<IDocuments[]>('documents1')
    return res.data
  }
}