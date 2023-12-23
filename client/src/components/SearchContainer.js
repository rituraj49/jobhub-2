import React, { useMemo, useState } from 'react'
import Wrapper from '../assets/wrappers/SearchContainer'
import FormRow from './FormRow'
import FormRowSelect from './FormRowSelect'
import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom'

function SearchContainer() {

  const [localSearch, setLocalSearch] = useState('');

  const { searchType, jobTypeOptions, searchStatus, statusOptions, sort, sortOptions, search, handleChange, clearFilters } = useAppContext();

  const handleSearchInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value })
  }

  const handleClearValues = (e) => {
    e.preventDefault();
    setLocalSearch('')
    clearFilters();
  }

  // const debounce = (e) => {
  //   // setLocalSearch(e.target.value);
  //   let timeOutId;
  //   return (e) => {
  //     setLocalSearch(e.target.value);
  //     console.log(localSearch);
  //     clearTimeout(timeOutId);
  //     timeOutId = setTimeout(() => {
  //       handleChange({ name: e.target.name, value: e.target.value})
  //     }, 1000);
  //   }
  // }
  const debounce = (setLocalSearch) => {
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value });
      }, 1000);
    };
  };
  // const optimizedDebounce = useMemo(() => debounce(), []);
  return (
    <Wrapper>
      <form className="form">
        <h5>search form</h5>
        <div className="form-center">

          <FormRow
            type='search'
            name="search"
            handleChange={debounce(setLocalSearch)}
            // defaultValue={search}
            value={localSearch} />
          {/* <FormRow
            type='search'
            name="search"
            handleChange={handleSearchInput}
            // defaultValue={search}
            value={search} /> */}

          {/* job type */}

          <FormRowSelect
            name='searchType'
            value={searchType}
            handleChange={handleSearchInput}
            options={['all', ...jobTypeOptions]}
            labelText='job type'
          // defaultValue={searchType}
          />

          {/* status */}

          <FormRowSelect
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearchInput}
            options={['all', ...statusOptions]}
          labelText='status'
          // defaultValue={searchStatus}
          />

          {/* sort */}

          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearchInput}
            options={[...sortOptions]}
            labelText='sort by'
          // defaultValue={sort}
          />
          {/* <div className="btn-container">
            <button className='btn clear-btn'>clear</button>
            <button type="submit" className='btn btn-block'>submit</button>
          </div> */}
          <div className="btn-container">

            <button
              className='btn clear-btn'
              onClick={handleClearValues}
            >
              clear filters
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer