import React, { FC, useEffect } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useAction';

const DashboardRoute: FC = () => {
  const { docs, loading, error } = useTypedSelector(state => state.docs)
  const { fetchDocs1, fetchDocs2 } = useActions()

  useEffect(() => {
    fetchDocs1()
    fetchDocs2()
  }, [])

  console.log('====================================');
  console.log('docs >>', docs);
  console.log('====================================');

  return (
    <div>
      
    </div>
  )
}

export default DashboardRoute