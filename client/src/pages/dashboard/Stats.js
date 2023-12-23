import React, { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import { ChartsContainer, StatsContainer } from '../../components';

function Stats() {
  const { getStats, defaultStats, monthlyApplications } = useAppContext();
  console.log(defaultStats);
  console.log(monthlyApplications);
  useEffect(() => {
    getStats()
  },[])
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {
        monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
        )}
      </>
  )
}

export default Stats