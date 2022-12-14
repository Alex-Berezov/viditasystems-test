import React, { FC } from 'react'
import './styles.scss'

interface ItemSearchProps {
  value: string
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ItemSearch: FC<ItemSearchProps> = ({ handleSearch, value }) => {
  return (
    <div className='search-block'>
      <p>Поиск:</p>
      <input type="search" value={value} onChange={handleSearch} />
    </div>
  )
}

export default ItemSearch