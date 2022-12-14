import React, { FC } from 'react'
import './styles.scss'

interface StatusButtonProps {
  mod: string
  children: string
}

const StatusButton: FC<StatusButtonProps> = ({mod, children}) => {
  return (
    <button
      className={mod === 'active' ? 'status-active status-button' : 'status-archive status-button'}
    >
      {children}
    </button>
  )
}

export default StatusButton