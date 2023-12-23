import React from 'react'

function FormRow({ name, value, handleChange, labelText, type, defaultValue='' }) {

    return (
        <div className="form-row">
            <label htmlFor={name} className='form-label'>{labelText || name}</label>
            <input type={type}
                name={name}
                value={value}
                // defaultValue={defaultValue}
                onChange={handleChange}
                className='form-input' />
        </div>
    )
}

export default FormRow