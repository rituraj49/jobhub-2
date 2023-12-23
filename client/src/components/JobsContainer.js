import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/JobsContainer';
import Loading from './Loading';
import Job from './Job';
import Alert from './Alert';
import PageBtnContainer from './PageBtnContainer';
import PageBtnContainerComplex from './PageBtnContainerComplex';

function JobsContainer() {
    const { getAllJobs, jobs, isLoading, page, totalJobs, showAlert, search, searchStatus, searchType, sort, numOfPages } = useAppContext();
    // console.log(jobs);
    useEffect(() => {
        getAllJobs();
    },[search, searchStatus, searchType, sort, page])
    // if(isLoading){
    //     return <Loading center />
    // }
  return (
    <Wrapper>
        { showAlert && <Alert />}
        { isLoading && <Loading center />}
        {jobs.length === 0 && <h2>No jobs to display...</h2>}
        <header>
        <h5>
            {totalJobs} job{jobs.length>1 && 's'} found
        </h5>
        </header>
        <div className="jobs">
            {jobs && jobs.map((item) => {
                return <Job key={item._id} {...item} />
            })}
        </div>
        {/* pagination buttons */}
        {/* {numOfPages > 1 && <PageBtnContainer /> } */}
        {numOfPages > 1 && <PageBtnContainerComplex /> }
    </Wrapper>
  )
}

export default JobsContainer