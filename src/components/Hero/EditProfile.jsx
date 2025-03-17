import React, { useState } from 'react';
import Img2 from "../../assets/isezerano.png";

const EditProfile = ({ onClose, defaultValues, onSave }) => {
  const [name, setName] = useState(defaultValues.name || '');
  const [location, setLocation] = useState(defaultValues.location || '');
  const [phone, setPhone] = useState(defaultValues.phone || '');
  const [showImg2, setShowImg2] = useState(false);

  const handleSave = () => {
    const updatedProfile = { name, location, phone };
    onSave(updatedProfile);
  };

  const handleImg2Click = () => {
    setShowImg2(true);
    setTimeout(() => {
      setShowImg2(false);
    }, 1500);
  };

  return (
    <div className="relative">
      <div className="flex flex-col justify-center items-center mt-9">
        <p className="text-sm">Click to change / Edit</p>
        <p className="bg-white text-black text-sm py-1 px-3 mt-3 rounded-full">Change Profile</p>
      </div>

      <div className="relative ">
        {showImg2 && (
          <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 z-50 flex justify-center items-start pt-5">
            <img
              src={Img2}
              alt="Dynamic Image"
              className="rounded w-80"
            />
          </div>
        )}
        <div
        className=" h-70 flex flex-col items-center justify-center cursor-pointer"
        onClick={handleImg2Click}
      >

      <div className="mt-3">
       <label className="block">
        <span className="text-white text-sm ml-3 flex">Change Name</span>
         <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-black py-1 mt-1 font-semibold text-center rounded-full"
         />
       </label>
      <label className="block">
      <span className="text-white ml-3">Change Location</span>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="text-black mt-1 font-semibold block py-1 text-center rounded-full"
       />
      </label>
     <label className="block">
       <span className="text-white ml-3">Change Phone</span>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="text-black block font-semibold text-center py-1 rounded-full"
        />
     </label>
     </div>

     <div className="mt-6 mb-2 flex justify-center space-x-3">
     <button
      onClick={handleSave}
       className="px-5 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-600"
      >
         Save
    </button>
      </div>
      </div>
      </div>
    </div>
  );
};

export default EditProfile;

