import { useState } from 'react'

export default function useSearch(initialValue: string) {
  const [value, setValue] = useState(initialValue)

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  return { value, handleSearch }
}