import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfileData, updateProfileData, toggleEditMode, searchUsers } from '../../features/profile/profileSlice';
import styles from './profile.module.css';
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
  const dispatch = useDispatch();
  const { data, status, error, isEditing, searchedUsers } = useSelector((state) => state.profile);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [decodedBirthDate, setDecodedBirthDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedBirthDate(decoded.birthDate);
      } catch (error) {
        console.error("Error decoding the token:", error);
      }
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
  }, [data]);

  useEffect(() => {
    const savedPicture = localStorage.getItem('profilePicture');
    if (savedPicture) {
      setSelectedPicture(savedPicture);
    }
  }, []);

  const [formData, setFormData] = useState({
    firstName: data.firstName,
    lastName: data.lastName,
    birthDate: data.birthDate,
    email: data.email,
  });

  const handleEditToggle = () => {
    dispatch(toggleEditMode());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const newPicture = reader.result;
      setSelectedPicture(newPicture);
      localStorage.setItem('profilePicture', newPicture);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const updatedData = { ...formData, picture: selectedPicture };
    dispatch(updateProfileData(updatedData));
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Pārbaudām, vai query nav tukšs
    if (query.trim()) {
      dispatch(searchUsers(query)); // Ja ir ievadīts teksts, izsistam meklēšanas pieprasījumu
    } else {
      dispatch(searchUsers('')); // Ja teksts ir tukšs, noņemam iepriekšējos meklēšanas rezultātus
    }
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

  const formattedBirthDate = decodedBirthDate ? new Date(decodedBirthDate).toLocaleDateString() : data.birthDate ? new Date(data.birthDate).toLocaleDateString() : 'Birthdate not provided';

  return (
    <div className={styles.profileContainer}>
      {/* Search Bar */}
      <div className={styles.searchBar}>
        <input 
          type="text" 
          placeholder="Search users by name or surname..." 
          value={searchQuery} 
          onChange={handleSearchChange} 
        />
      </div>

      {/* Display Search Results */}
      {searchedUsers && searchedUsers.length > 0 && (
        <div className={styles.searchResults}>
          <h3>Search Results:</h3>
          <ul>
            {searchedUsers.map((user) => (
              <li key={user.id}>{user.firstName} {user.lastName}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Profile View or Edit */}
      {!isEditing ? (
        <div className={styles.profileView}>
          <img 
            src={selectedPicture || 'https://default-image-url.com'} 
            alt="Profile" 
            className={styles.profilePicture} 
          />
          <div className={styles.profileDetails}>
            <h2>{data.firstName} {data.lastName}</h2>
            <p><strong>Birth Date:</strong> {formattedBirthDate}</p>
            <p><strong>Email:</strong> {data.email}</p>
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
            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
            <label htmlFor="birthDate"><strong>Birth Date:</strong></label>
            <input 
              type="date" 
              id="birthDate" 
              name="birthDate" 
              value={formData.birthDate ? new Date(formData.birthDate).toISOString().split('T')[0] : ''} 
              onChange={handleChange} 
            />
            <label htmlFor="email"><strong>Email:</strong></label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
