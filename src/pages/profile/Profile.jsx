import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfileData, updateProfileData, toggleEditMode } from '../../features/profile/profileSlice';
import styles from './profile.module.css';
import { jwtDecode } from 'jwt-decode'; 


const Profile = () => {
  const dispatch = useDispatch();
  const { data, status, error, isEditing } = useSelector((state) => state.profile);
  const [selectedPicture, setSelectedPicture] = useState(null);

  // State to store birthDate from the token if needed
  const [decodedBirthDate, setDecodedBirthDate] = useState(null);

  // Decode the JWT token to get the user information (including birthDate)
  const token = localStorage.getItem('accessToken');  
  console.log("Token from localStorage:", token);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);  
        console.log(decoded);  
        setDecodedBirthDate(decoded.birthDate);  // Store the birthDate from decoded token
      } catch (error) {
        console.error("Error decoding the token:", error);
      }
    } else {
      console.log("No token available.");
    }
  }, [token]);

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  useEffect(() => {
    if (data.picture) {
      setSelectedPicture(data.picture);
      localStorage.setItem('profilePicture', data.picture);
    }
    console.log("Profile data in useEffect:", data);  // Log data to ensure birthDate exists
  }, [data]);

  useEffect(() => {
    const savedPicture = localStorage.getItem('profilePicture');
    if (savedPicture) {
      setSelectedPicture(savedPicture);
    }
  }, []);

  const handleEditToggle = () => {
    dispatch(toggleEditMode());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateProfileData({ ...data, [name]: value }));
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const newPicture = reader.result;
      setSelectedPicture(newPicture);
      localStorage.setItem('profilePicture', newPicture);
      dispatch(updateProfileData({ ...data, picture: newPicture }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    dispatch(updateProfileData({ ...data, picture: selectedPicture }));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No profile data available</div>;
  }

  // Check if birthDate is available and formatted properly
  const formattedBirthDate = decodedBirthDate ? new Date(decodedBirthDate).toLocaleDateString() : data.birthDate ? new Date(data.birthDate).toLocaleDateString() : 'Birthdate not provided';

  return (
    <div className={styles.profileContainer}>
      {!isEditing ? (
        <div className={styles.profileView}>
          <img 
            src={selectedPicture || 'https://default-image-url.com'} 
            alt="Profile" 
            className={styles.profilePicture} 
          />
          <div className={styles.profileDetails}>
            <h2>{data.firstName} {data.lastName}</h2>
            <p><strong>Birth Date:</strong> {formattedBirthDate}</p> {/* Make only 'Birth Date:' strong */}
            <p><strong>Email:</strong> {data.email}</p> {/* Make only 'Email:' strong */}
          </div>
          <button onClick={handleEditToggle}>Edit Profile</button>
        </div>
      ) : (
        <div className={styles.editProfile}>
          <div className={styles.editPicture}>
            <label htmlFor="picture">Change Picture:</label>
            <input type="file" id="picture" name="picture" onChange={handlePictureChange} />
          </div>
          <div className={styles.editDetails}>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" value={data.firstName} onChange={handleChange} />
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" value={data.lastName} onChange={handleChange} />
            <label htmlFor="birthDate"><strong>Birth Date:</strong></label> {/* Make only 'Birth Date:' strong */}
            <input 
              type="date" 
              id="birthDate" 
              name="birthDate" 
              value={data.birthDate ? new Date(data.birthDate).toISOString().split('T')[0] : ''} 
              onChange={handleChange} 
            />
            <label htmlFor="email"><strong>Email:</strong></label> {/* Make only 'Email:' strong */}
            <input type="email" id="email" name="email" value={data.email} onChange={handleChange} />
          </div>
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
