import { IDocuments } from "../types/Types"
import { instance } from "./api"

export const documents1API = {
  async getDocuments1() {
    const res = await instance.get<IDocuments[]>('documents1')
    return res.data
  },
  async updateDocuments1Item(itemId: string) {
    return await instance.patch(`documents1/${itemId}`, { 'status': 'archive' })
  }
}