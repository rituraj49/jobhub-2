import React from 'react'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useAppContext } from '../../context/appContext'
import { Alert, FormRow, FormRowSelect } from '../../components/';

function AddJob() {
  const { isEditing, showAlert, displayAlert, position, company, jobLocation, jobType, jobTypeOptions, status, statusOptions, handleChange, clearValues, createJob, isLoading, editJob } = useAppContext();

  const handleJobInput = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    // console.log(`${name} : ${value}`);
    handleChange({ name, value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!position || !company || !jobLocation){
      displayAlert();
      return
    }
    if(isEditing){
      editJob();
      return
    }
  createJob();

  }

  const handleClearValues = (e) => {
    e.preventDefault();
    clearValues();
  }
  return (
    <Wrapper>
      <form className="form"> 
        <h3>{isEditing ? 'Edit job' : 'Add job'} </h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* position */}
          <FormRow 
          type='text'
          name='position'
          value={position}
          handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow 
          type='text'
          name='company'
          value={company}
          handleChange={handleJobInput}
          />
          {/* jobLocation */}
          <FormRow 
          type='text'
          name='jobLocation'
          labelText = 'Job Location'
          value={jobLocation}
          handleChange={handleJobInput}
          />

          {/* job type */}
          
          <FormRowSelect 
          name='jobType'
          value={jobType}
          handleChange={handleJobInput}
          options={jobTypeOptions}
          labelText='job type'
          />
          
          {/* status */}

          <FormRowSelect 
          name='status'
          value={status}
          handleChange={handleJobInput}
          options={statusOptions}
          // labelText='status'
          />

          <div className="btn-container">
            <button type='submit' 
            className='btn btn-block'
            onClick={handleSubmit}
            disabled={isLoading}
            >
              submit
            </button>
            <button 
            className='btn clear-btn'
            onClick={handleClearValues}
            >
              clear
            </button>
          </div>
                  </div>
      </form>
    </Wrapper>
  )
}

export default AddJob