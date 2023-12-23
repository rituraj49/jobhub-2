import React, { useState } from 'react'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useAppContext } from '../../context/appContext'
import Alert from '../../components/Alert'
import FormRow from '../../components/FormRow'

function Profile() {
  const { user, showAlert, displayAlert, updateUser, isLoading } = useAppContext();
  const [name, setName] = useState(user?.name);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [location, setLocation] = useState(user?.location);
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !email || !lastName || !location){
      displayAlert();
      return
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('location', location);
    formData.append('avatar', avatar);

    // updateUser({ name, email, lastName, location });
    updateUser(formData);
    console.log(formData,'update user');
  }
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit} encType='multipart/form-data' >
        <h3>profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">

          <div className="form-row">
            <label htmlFor="avatar" className='form-label'>
              Select an image (max size 0.5 mb)
            </label>
            <input type="file" id='avatar' name='avatar' className='form-input' accept='image/*'
            onChange={(e) => setAvatar(e.target.files[0])}
            />
          </div>

          <FormRow
            type='text'
            name='name'
            labelText='name'
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type='text'
            name='lastName'
            labelText='last name'
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type='email'
            name='email'
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type='location'
            name='location'
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />

          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please wait...' : 'save changes'}
          </button>

        </div>
      </form>
    </Wrapper>
  )
}

export default Profile