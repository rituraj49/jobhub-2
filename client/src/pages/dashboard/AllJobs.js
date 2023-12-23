import React from 'react'
import { useAppContext } from '../../context/appContext'
import { SearchContainer, JobsContainer } from '../../components';

function AllJobs() {

  return (
    <>
      <SearchContainer />
      <JobsContainer />
    </>
  )
}

export default AllJobs