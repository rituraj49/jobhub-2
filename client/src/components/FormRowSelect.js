import React from 'react'

function FormRowSelect({ name, value, handleChange, options, labelText, defaultValue }) {
  // const containsAll = options.includes('all');
  // defaultValue = containsAll ? 'all' : '';
  return (
    <div className="form-row">
    <label htmlFor={name} className='form-label'>
      {labelText || name}
    </label>
    <select
    name={name} 
    value={value}
    onChange={handleChange}
    className='form-select'
    // defaultValue={defaultValue}
    >
      {
        options.map((item, index) => {
          return (
            <option value={item} key={index} >{item}</option>
          )
        })
      }
    </select>
  </div>
  )
}

export default FormRowSelect