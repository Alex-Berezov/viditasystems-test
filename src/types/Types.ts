export interface IDocuments {
  id: string,
  status: string,
  sum: number,
  qty: number,
  volume: number,
  name: string,
  delivery_date: string,
  currency: string
}

export interface ICheckedItems {
  id: string
  name: string
}