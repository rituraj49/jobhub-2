import React from 'react';
import moment from 'moment';
import Wrapper from '../assets/wrappers/Job';
import {FaCalendarAlt} from 'react-icons/fa'
import { IoBriefcase } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import { useAppContext } from '../context/appContext';
import { Link } from 'react-router-dom';
import JobInfo from './JobInfo';

function Job({ _id, company, createdAt, position, status, jobType, jobLocation }) {
  const { setEditJob, deleteJob } = useAppContext();
  let date = moment(createdAt);
  date = date.format('MMMM Do YYYY');
  // console.log(date);
  // const handleEditJob = (_id) => {
  //   console.log('id: ',_id,' company: ', company );
  //   setEditJob(_id)
  // }
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <h5>{position}</h5>
        <p>{company}</p>
      </header>
      <div className="content">
        {/* content center later */}
        <div className="content-center">
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<IoBriefcase />} text={jobType} />
          <JobInfo icon={<FaMapLocationDot />} text={jobLocation} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link 
            to="/add-job"
            onClick={()=> setEditJob(_id)}
            className='btn edit-btn'
            >edit</Link>
            <button 
            type='button'
            onClick={()=>deleteJob(_id)}
            className='btn delete-btn'
            >delete</button>
          </div>
        </footer>
      </div>
    </Wrapper>
  ) 

}

export default Job