import { useEffect, useState } from 'react'
import { IDocuments } from '../../../types/Types'

export default function useItemsSearch(items: Array<IDocuments>, value: string) {
  const [searchedItems, setSearchedItems] = useState<Array<IDocuments>>(items)

  useEffect(() => {
    setSearchedItems(items)
  }, [items])

  useEffect(() => {
    setSearchedItems(items.filter(item => {
      return item.name.toLowerCase().includes(value.toLowerCase())
        || item.currency.toLowerCase().includes(value.toLowerCase())
        || item.delivery_date.toLowerCase().includes(value.toLowerCase())
        || item.status.toLowerCase().includes(value.toLowerCase())
        || item.qty === +value
        || item.sum === +value
        || item.volume === +value
    }))
  }, [value])

  return { searchedItems }
}