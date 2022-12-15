import { IDocuments } from "../types/Types"
import { instance } from "./api"

export const documents2API = {
  async getDocuments2() {
    const res = await instance.get<IDocuments[]>('documents2')
    return res.data
  },
  async updateDocuments2Item(itemId: string) {
    return await instance.patch(`documents2/${itemId}`, { 'status': 'archive' })
  }
}