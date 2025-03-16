import React, { useState } from 'react';
import EditProfile from './EditProfile';
import Img1 from '../../assets/shous1.png';
import { IoCloseOutline } from 'react-icons/io5';

const ProfileSidebar = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showImg2, setShowImg2] = useState(false); 

  const handleEditClick = () => {
    setIsEditing(true); 
  };

  const handleSave = (updatedProfile) => {
    console.log('Updated Profile:', updatedProfile); 
    setIsEditing(false); 
  };

  const handleCloseEdit = () => {
    setIsEditing(false); 
  };

  const handleImg2Click = () => {
    setShowImg2(true); 
    setTimeout(() => {
      setShowImg2(false); 
    }, 2000); 
  };

  return (
    <div
      className={`bg-gradient-to-t from-purple-400 to-blue-700 w-80 rounded-2xl ml-10 text-white mt-8 transition-all duration-500 ${
        isEditing ? 'h-auto' : 'h-80'
      }`}
      style={{backgroundColor: "linear-gradient-to-t from-#3D5AF1 to-b"}}
    >
      <div className="relative flex flex-col">
        {/* Profile Image */}
        <img
          src={Img1}
          alt=""
          className="h-20 w-20 mt-10 rounded-full mx-auto"
        />

        {/* Close Icon positioned at the top-right */}
        {isEditing && (
          <button
            onClick={handleCloseEdit}
            className="absolute top-4 right-4 bg-gray-200 p-2 rounded-full"
          >
            <IoCloseOutline size={24} className="text-gray-700" />
          </button>
        )}
      </div>

      <div className="flex ml-7 mt-4 text-3xl font-bold">Kamariza Esther</div>
      <div>
        <ul>
          <li className="ml-7">ISEZERANO Choir</li>
          <li className="ml-7">Kigali-Rwanda</li>
          <li className="ml-7">Tel: 0788-288-122</li>
        </ul>

        {/* Show "Click Edit Profile" button only when not editing */}
        {!isEditing && (
          <button
            className="bg-purple-300 mt-10 h-9 w-36 flex items-center justify-center ml-24 rounded-t-2xl"
            onClick={handleEditClick}
          >
            Click Edit Profile
          </button>
        )}

        {isEditing && (
          <div className="mt- px-4">
            <EditProfile
              onClose={handleCloseEdit} 
              defaultValues={{
                name: 'Kamariza Esther',
                location: 'Kigali-Rwanda',
                phone: '0788-288-122',
              }}
              onSave={handleSave}
              onImg2Click={handleImg2Click} 
            />
          </div>
        )}
      </div>

      {/* Img2 Overlay */}
      {showImg2 && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <img src={Img2} alt="Overlay Image" className="rounded w-80" />
        </div>
      )}
    </div>
  );
};

export default ProfileSidebar;
