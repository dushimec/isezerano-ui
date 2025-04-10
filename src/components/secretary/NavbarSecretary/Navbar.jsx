"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import Img1 from "../../../assets/eng.webp";
import Img2 from "../../../assets/rw.png";
// import Img3 from "../../../assets/question 1.png";
import ProfileSidebar from "../../disciplinary/HeroDisciplinary/ProfileSidebar";
import ProgressBar from "../../disciplinary/ProgressBarDisciplinary/ProgressBar";

const SecretaryDashboard = ({ handleIsPopupOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    code: "Eng",
    img: Img1,
    name: "English",
  });
  const [isProgressVisible, setIsProgressVisible] = useState(false);
  const [showOnlyProgress, setShowOnlyProgress] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const calenderRef = useRef(null);
  const dropdownRef = useRef(null);

  // New state for choristers and editing
  const [choristers, setChoristers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // null means no edit in progress
  const [editFormData, setEditFormData] = useState({
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    Email: "",
  });

  // Load choristers from localStorage when component mounts.
  useEffect(() => {
    const storedChoristers = localStorage.getItem("choristers");
    if (storedChoristers) {
      setChoristers(JSON.parse(storedChoristers));
    } else {
      const initialData = [
        {
          FirstName: "john",
          LastName: "KAMILI",
          PhoneNumber: "+250-783-350-275",
          Email: "niyonagizerachel10@gmail.com",
        },
        {
          FirstName: "Jane",
          LastName: "Doe",
          PhoneNumber: "+250-123-456-789",
          Email: "jane.doe@example.com",
        },
      ];
      setChoristers(initialData);
      localStorage.setItem("choristers", JSON.stringify(initialData));
    }
  }, []);

  // Dropdown outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calendar outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calenderRef.current && !calenderRef.current.contains(event.target)) {
        setIsCalendarVisible(false);
      }
    };
    if (isCalendarVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCalendarVisible]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const selectLanguage = (code, img, name) => {
    setSelectedLanguage({ code, img, name });
    setIsDropdownOpen(false);
  };

  const handleHomeClick = () => {
    setShowOnlyProgress(true);
    setIsProgressVisible(true);
    setTimeout(() => {
      setIsProgressVisible(false);
      setShowOnlyProgress(false);
    }, 3000);
  };

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
    setEditingIndex(null); // clear editing index if closing without edit
  };

  const handleCheckPreviousDate = useCallback(() => {
    setIsCalendarVisible(!isCalendarVisible);
  }, [isCalendarVisible]);

  const languages = [
    { code: "Eng", img: Img1, name: "Engl" },
    { code: "Kiny", img: Img2, name: "Kiny" },
  ];

  const unselectedLanguages = languages.filter(
    (language) => language.code !== selectedLanguage.code
  );

  // When clicking "EDIT" button: set the record to be edited and show the modal.
  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditFormData({ ...choristers[index] });
    setIsPopupOpen(true);
  };

  // Handle input changes in the modal form.
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save changes and update localStorage.
  const handleEditSave = () => {
    // If editingIndex is null, assume it's an "add" operation.
    let updatedChoristers = [];
    if (editingIndex === null) {
      updatedChoristers = [...choristers, editFormData];
    } else {
      updatedChoristers = [...choristers];
      updatedChoristers[editingIndex] = editFormData;
    }
    setChoristers(updatedChoristers);
    localStorage.setItem("choristers", JSON.stringify(updatedChoristers));
    setIsPopupOpen(false);
    setEditingIndex(null);
  };

  // Delete a record from the list.
  const handleDelete = (index) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      const updatedChoristers = choristers.filter((_, i) => i !== index);
      setChoristers(updatedChoristers);
      localStorage.setItem("choristers", JSON.stringify(updatedChoristers));
    }
  };

  return (
    <div className="flex flex-col w-full md:flex-row md:h-screen">
      {/* Mobile Header */}
      <div className="flex items-center justify-between w-full p-4 bg-white border-b md:hidden">
        <div className="text-xl font-bold" style={{ color: "#3D5AF1" }}>
          SECRETARY DASHBOARD
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center justify-center p-2 rounded-full"
            onClick={toggleDropdown}
            ref={dropdownRef}
          >
            <img
              src={selectedLanguage.img || "/placeholder.svg"}
              alt={selectedLanguage.name}
              className="w-6 h-6"
            />
          </button>
          {isDropdownOpen && (
            <div
              className="absolute z-50 px-3 py-1 border rounded-md top-14 right-16"
              style={{ backgroundColor: "#3D5AF1", color: "white" }}
            >
              {unselectedLanguages.map((language) => (
                <a
                  key={language.code}
                  href={`#${language.code}`}
                  className="flex items-center justify-center gap-2 px-3 py-1"
                  onClick={() =>
                    selectLanguage(language.code, language.img, language.name)
                  }
                >
                  <img
                    src={language.img || "/placeholder.svg"}
                    alt={language.name}
                    className="inline-block w-6 h-6"
                  />
                  {language.name}
                </a>
              ))}
            </div>
          )}
          <button
            type="button"
            className="text-[#3D5AF1] p-2"
            onClick={toggleMobileMenu}
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="z-40 w-full p-4 bg-white border-b md:hidden">
          <div className="flex flex-col gap-3">
            <button
              type="button"
              className="flex items-center w-full gap-2 px-4 py-2 rounded-full"
              style={{ backgroundColor: "#3D5AF1", color: "white" }}
              onClick={handleHomeClick}
            >
              <FontAwesomeIcon icon={faHouse} /> Home
            </button>
            <button
              type="button"
              className="flex items-center w-full gap-2 px-4 py-2 rounded-full"
              style={{ backgroundColor: "#3D5AF1", color: "white" }}
            >
              Layout
            </button>
            <a
              className="flex items-center w-full gap-2 px-4 py-2 rounded-full"
              href="#Logout"
              style={{ backgroundColor: "#3D5AF1", color: "white" }}
            >
              <FontAwesomeIcon icon={faUser} /> Logout
            </a>
          </div>
        </div>
      )}

      {/* Sidebar - Hidden on mobile */}
      {!showOnlyProgress && (
        <aside className="hidden md:flex md:flex-col md:w-1/4 lg:w-1/5">
          <div className="bg-light mt-14">
            <a
              className="block text-2xl font-bold text-center"
              href="#"
              style={{ color: "#3D5AF1" }}
            >
              SECRETARY DASHBOARD
            </a>
          </div>
          <div>
            <ProfileSidebar />
          </div>
        </aside>
      )}

      {/* Main Content Section */}
      <div className="flex flex-col flex-grow md:mr-16">
        {/* Navigation Bar - Hidden on mobile */}
        {!showOnlyProgress && (
          <nav className="hidden md:flex md:items-center md:justify-end md:px-10 md:py-4">
            <ul className="flex items-center mt-5 gap-14">
              <li className="nav-item">
                <button
                  type="button"
                  className="flex items-center gap-4 rounded-full nav-link"
                  onClick={handleHomeClick}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#3D5AF1",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  <FontAwesomeIcon icon={faHouse} size="lg" /> Home
                </button>
              </li>
              <li className="nav-item">
                <a
                  className="flex items-center gap-2 rounded-full nav-link"
                  href="#Logout"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#3D5AF1",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  <FontAwesomeIcon icon={faUser} size="lg" /> Logout
                </a>
              </li>
              <li className="relative nav-item" ref={dropdownRef}>
                <button
                  type="button"
                  style={{
                    padding: "10px 30px",
                    backgroundColor: "#3D5AF1",
                    color: "white",
                    cursor: "pointer",
                  }}
                  className="flex items-center justify-center gap-3 rounded-full nav-link"
                  onClick={toggleDropdown}
                  aria-expanded={isDropdownOpen}
                >
                  <img
                    src={selectedLanguage.img || "/placeholder.svg"}
                    alt={selectedLanguage.name}
                    className="inline-block h-6"
                  />
                  {selectedLanguage.code}
                </button>
                {isDropdownOpen && (
                  <div
                    className="absolute px-3 py-1 border rounded-b-md"
                    style={{ backgroundColor: "#3D5AF1", color: "white" }}
                  >
                    {unselectedLanguages.map((language) => (
                      <a
                        key={language.code}
                        href={`#${language.code}`}
                        className="flex items-center justify-center gap-2 px-3 py-1"
                        onClick={() =>
                          selectLanguage(
                            language.code,
                            language.img,
                            language.name
                          )
                        }
                      >
                        <img
                          src={language.img || "/placeholder.svg"}
                          alt={language.name}
                          className="inline-block w-6 h-6"
                        />
                        {language.name}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            </ul>
          </nav>
        )}

        {/* Popup Modal for Editing/Adding */}
        {isPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg border max-w-[90%] md:max-w-[80%]">
              <div
                className="border border-[#3D5AF1] mt-4 mx-auto"
                style={{ width: "100%", height: "55vh" }}
              >
                <label className="block mb-1 text-sm font-medium">
                  FirstName
                </label>
                <input
                  type="text"
                  name="FirstName"
                  value={editFormData.FirstName}
                  onChange={handleEditChange}
                  className="ml-5 mt-2 border p-2 w-[90%]"
                />
                <label className="block mb-1 text-sm font-medium">
                  LastName
                </label>
                <input
                  type="text"
                  name="LastName"
                  value={editFormData.LastName}
                  onChange={handleEditChange}
                  className="ml-5 mt-2 border p-2 w-[90%]"
                />
                <label className="block mb-1 text-sm font-medium">
                  PhoneNumber
                </label>
                <input
                  type="text"
                  name="PhoneNumber"
                  value={editFormData.PhoneNumber}
                  onChange={handleEditChange}
                  className="ml-5 mt-2 border p-2 w-[90%]"
                />
                <label className="block mb-1 text-sm font-medium">Email</label>
                <input
                  type="text"
                  name="Email"
                  value={editFormData.Email}
                  onChange={handleEditChange}
                  className="ml-5 mt-2 border p-2 w-[90%]"
                />
              </div>
              <div className="flex justify-center gap-4 mt-20">
                <button
                  type="button"
                  className="bg-[#3D5AF1] rounded-full text-white py-2 px-4"
                  onClick={handleEditSave}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-[#3D5AF1] rounded-full text-white py-2 px-4"
                  onClick={() => {
                    setIsPopupOpen(false);
                    setEditingIndex(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-5">{isProgressVisible && <ProgressBar />}</div>

        {/* Content Section */}
        <div className="flex-grow ml-20">
          {!showOnlyProgress && (
            <div className="flex-grow px-4 md:ml-16 md:px-0">
              {/* <h2 className="mt-4 text-2xl font-bold md:mt-0">
                Presence Details
              </h2> */}
              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  type="button"
                  onClick={handleCheckPreviousDate}
                  className="px-4 py-2 border border-[#3D5AF1] rounded-full text-[#3D5AF1] text-sm md:text-base"
                >
                  LIST OF CHORALIST
                </button>
                {/* <button
                  type="button"
                  className="px-4 py-2 rounded-full border border-[#3D5AF1] text-[#3D5AF1] text-sm md:text-base"
                >
                  Attendance 63%
                </button> */}
                <button
                  type="button"
                  className="px-4 py-2 text-white bg-blue-500 rounded"
                  onClick={() => {
                    // For adding a new record, clear the form and editing index.
                    setEditingIndex(null);
                    setEditFormData({
                      FirstName: "",
                      LastName: "",
                      PhoneNumber: "",
                      Email: "",
                    });
                    setIsPopupOpen(true);
                  }}
                >
                  ADD
                </button>
              </div>

              {/* Responsive Table */}
              <div className="mt-5 mb-20 overflow-x-auto">
                <table className="w-full border rounded-md">
                  {!isPopupOpen && (
                    <thead className="bg-[#DEE1E6]">
                      <tr>
                        <th className="px-2 md:px-4 py-2 text-left text-xs font-medium text-[#565E6C] uppercase tracking-wider">
                          No
                        </th>
                        <th className="px-2 md:px-4 py-2 text-left text-xs font-medium text-[#565E6C] uppercase tracking-wider">
                          FirstName
                        </th>
                        <th className="hidden md:table-cell px-6 py-2 text-left text-xs font-medium text-[#565E6C] uppercase tracking-wider">
                          LastName
                        </th>
                        <th className="hidden md:table-cell px-6 py-2 text-left text-xs font-medium text-[#565E6C] uppercase tracking-wider">
                          Phone Number
                        </th>
                        <th className="hidden md:table-cell px-6 py-2 text-left text-xs font-medium text-[#565E6C] uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-2 md:px-4 py-3 text-left text-xs font-medium text-[#565E6C] uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                  )}
                  <tbody className="bg-white">
                    {isCalendarVisible && (
                      <div
                        ref={calenderRef}
                        className="absolute z-30 bg-white shadow-lg"
                      >
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date) => setSelectedDate(date)}
                          inline
                        />
                      </div>
                    )}
                    {choristers.map((record, index) => (
                      <tr key={index}>
                        <td className="hidden px-8 py-2 text-sm text-gray-500 md:table-cell">
                          {index + 1}
                        </td>
                        <td className="px-2 py-2 text-xs text-gray-500 md:px-4 md:text-sm">
                          {record.FirstName}
                        </td>
                        <td className="px-2 py-2 text-xs text-gray-500 md:px-4 md:text-sm">
                          {record.LastName}
                        </td>
                        <td className="px-2 py-2 text-xs text-gray-500 md:px-4 md:text-sm">
                          {record.PhoneNumber}
                        </td>
                        <td className="px-2 py-2 text-xs text-gray-500 md:px-4 md:text-sm">
                          {record.Email}
                        </td>
                        <td className="px-2 py-3 text-xs font-medium text-left md:px-8 whitespace-nowrap md:text-sm">
                          <button
                            type="button"
                            onClick={() => handleEditClick(index)}
                            className="bg-[#3D5AF1] text-white px-4 py-2 rounded-full"
                          >
                            EDIT
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(index)}
                            className="px-4 py-2 ml-2 text-white bg-red-500 rounded-full"
                          >
                            DELETE
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecretaryDashboard;

// import React, { useState, useRef, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
// import Img1 from "../../assets/eng.webp";
// import Img2 from "../../assets/rw.png";
// import Img3 from "../../assets/question 1.png";
// import ProfileSidebar from "../Hero/ProfileSidebar";
// import ProgressBar from "../ProgressBar/ProgressBar";
// import { useCallback } from "react";

// const SecretaryDashboard = ({ handleIsPopupOpen }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState({
//     code: "Eng",
//     img: Img1,
//     name: "English",
//   });

//   const [isProgressVisible, setIsProgressVisible] = useState(false);
//   const [showOnlyProgress, setShowOnlyProgress] = useState(false)
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [isCalendarVisible, setIsCalendarVisible] = useState(false);
//   const calenderRef = useRef (null)
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const selectLanguage = (code, img, name) => {
//     setSelectedLanguage({ code, img, name });
//     setIsDropdownOpen(false);
//   };

//   const handleHomeClick = () => {
//     setShowOnlyProgress(true);
//     setIsProgressVisible(true);
//     setTimeout(() => {
//       setIsProgressVisible(false);
//       setShowOnlyProgress(false);
//     }, 3000);
//   };

//   const handlePopupToggle = () => {
//     setIsPopupOpen(!isPopupOpen);
//   };

//   const handleCheckPreviousDate = useCallback(() => {
//     setIsCalendarVisible(!isCalendarVisible);
//   }, [isCalendarVisible]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (calenderRef.current && !calenderRef.current.contains(event.target)) {
//         setIsCalendarVisible(false);
//       }
//     };
//     if (isCalendarVisible) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isCalendarVisible]);

//   const languages = [
//     { code: "Eng", img: Img1, name: "Engl" },
//     { code: "Kiny", img: Img2, name: "Kiny" },
//   ];

//   const unselectedLanguages = languages.filter(
//     (language) => language.code !== selectedLanguage.code
//   );

//   return (
//     <div className="flex h-screen ml-10">
//       {/* Sidebar Section */}
//       {!showOnlyProgress && (
//         <aside className="flex flex-col">
//         {/* Titiv className="bg-light mt-14">
//           <a
//             className="block text-2xl font-bold text-center"
//             href="#"
//             style={{ color: "#3D5AF1" }}
//           >
//             CHORISTE DASHBOARD
//           </a>
//         </div>
//         <div>
//           <ProfileSidebar />
//         </div>
//       </aside>
//       )}

//      {/* Main Content Section */}
//       <div className="flex flex-col flex-grow mr-16">
//         {/* Navigation Bar */}
//        {!showOnlyProgress && (
//         <nav className="flex items-center justify-end px-10 py-4">
//           <ul className="flex items-center mt-5 gap-14">
//             <li className="nav-item">
//               <button
//                 className="flex items-center gap-4 rounded-full nav-link"
//                 onClick={handleHomeClick}
//                 style={{
//                   padding: "10px 20px",
//                   backgroundColor: "#3D5AF1",
//                   color: "white",
//                   cursor: "pointer",
//                 }}
//               >
//                 <FontAwesomeIcon icon={faHouse} size="lg" /> Home
//               </button>
//             </li>
//             <li className="nav-item">
//               <a
//                 className="flex items-center gap-2 rounded-full nav-link"
//                 href="#Logout"
//                 style={{
//                   padding: "10px 20px",
//                   backgroundColor: "#3D5AF1",
//                   color: "white",
//                   cursor: "pointer",
//                 }}
//               >
//                 <FontAwesomeIcon icon={faUser} size="lg" /> Logout
//               </a>
//             </li>
//             <li className="relative nav-item" ref={dropdownRef}>
//               <button
//                 style={{
//                   padding: "10px 30px",
//                   backgroundColor: "#3D5AF1",
//                   color: "white",
//                   cursor: "pointer",
//                 }}
//                 className={`nav-link flex items-center justify-center gap-3 rounded-full`}
//                 onClick={toggleDropdown}
//                 aria-expanded={isDropdownOpen}
//               >
//                 <img
//                   src={selectedLanguage.img}
//                   alt={selectedLanguage.name}
//                   className="inline-block h-6"
//                 />
//                 {selectedLanguage.code}
//               </button>
//               {isDropdownOpen && (
//                 <div
//                   className="absolute px-3 py-1 border rounded-b-md"
//                   style={{ backgroundColor: "#3D5AF1", color: "white" }}
//                 >
//                   {unselectedLanguages.map((language) => (
//                     <a
//                       key={language.code}
//                       href={`#${language.code}`}
//                       className="flex items-center justify-center gap-2 px-3 py-1"
//                       onClick={() =>
//                         selectLanguage(language.code, language.img, language.name)
//                       }
//                     >
//                       <img
//                         src={language.img}
//                         alt={language.name}
//                         className="inline-block w-6 h-6"
//                       />
//                       {language.name}
//                     </a>
//                   ))}
//                 </div>
//               )}
//             </li>
//             <li className="nav-item">
//               <button
//                 onClick={() => {
//                   console.log("FAQ Button Clicked");
//                   handleIsPopupOpen();
//                 }}
//                 className="flex items-center justify-center gap-1 px-5 py-2 text-blue-700 border border-blue-600 rounded-full "
//               >
//                 <img src={Img3} alt="FAQ" className="h-7 w-7" />
//                 FAQ/Ask Question
//               </button>
//             </li>
//           </ul>
//         </nav>
//        )}

//       {isPopupOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="p-6 bg-white border rounded-lg shadow-lg">
//               <div
//                 className="border border-[#3D5AF1] mt-9 ml-9 mr-9"
//                 style={{ width: "80vh", height: "40vh" }}
//               >
//                 <p className="mt-5 ml-5 font-serif">Leave the reason for claiming!!</p>
//                 <input type="text" name="reason" />
//               </div>
//               <div className="flex justify-center gap-4 mt-5">
//                 <button
//                   className="px-4 py-2 text-white bg-red-500 rounded"
//                   onClick={handlePopupToggle}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="bg-[#3D5AF1] rounded-full text-white py-2 px-4"
//                   onClick={() => {
//                     handlePopupToggle();
//                     console.log("Claim confirmed");
//                   }}
//                 >
//                   Click to Claim
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="mt-5">{isProgressVisible && <ProgressBar />}</div>

//         {/* Content Section */}
//         <div className="flex-grow">
//           {!showOnlyProgress && (
//             <div className="flex-grow ml-16">
//             <h2 className="text-2xl font-bold">Presence Details</h2>
//             <div className="ml-3">
//               <button
//                 onClick={handleCheckPreviousDate}
//                 className="px-4 py-2 mt-5 border border-[#3D5AF1] rounded-full text-[#3D5AF1]"
//               >
//                 Check Previous Date
//               </button>
//                <button className="px-4 py-2 rounded-full border border-[#3D5AF1] text-[#3D5AF1] ml-5">
//                  Attendance 63%
//                </button>
//                 <button className="px-4 py-2 rounded-full text-white bg-[#3D5AF1] ml-5">
//                  Choir Events
//                </button>

//             </div>

//             <table className="w-full mt-5 mb-20 border rounded-md h-50">
//                 {!isPopupOpen && (
//                   <thead className="bg-[#DEE1E6]">
//                     <tr>
//                       <th className="px-4 py-2 text-left text-xs font-medium text-[#565E6C] uppercase tracking-wider">
//                         Date
//                       </th>
//                       <th className="px-6 py-2 text-left text-xs font-medium text-[#565E6C] uppercase tracking-wider">
//                         Time
//                       </th>
//                       <th className="px-6 py-2 text-left text-xs font-medium text-[#565E6C] uppercase tracking-wider">
//                         Reason
//                       </th>
//                       <th className="px-4 py-2 text-left text-xs font-medium text-[#565E6C] uppercase tracking-wider">
//                         Punishment
//                       </th>
//                       <th className="px-20 py-3 text-left text-xs font-medium text-[#565E6C] uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                 )}
//                 <tbody className="bg-white">

//                       {isCalendarVisible && (
//                         <div ref={calenderRef} className="absolute flex ml-">
//                           <DatePicker
//                             selected={selectedDate}
//                             onChange={(date) => setSelectedDate(date)}
//                             inline
//                           />
//                         </div>
//                       )}

//                   {[
//                     { date: "14/10/20245", reason: "On Time", punishment: "Good" },
//                     { date: "15/10/2024", reason: "Late Arrival", punishment: "Neglect" },
//                     { date: "16/10/2024", reason: "Absent", punishment: "Disrespect" },
//                     { date: "17/10/2024", reason: "On Time", punishment: "Good" },

//                   ].map((record, index) => (
//                     <tr key={index}>
//                       <td className="px-4 py-2 text-sm text-gray-500">
//                         {record.date}
//                       </td>
//                       <td className="px-8 py-2 text-sm text-gray-500">-</td>
//                       <td className="px-6 py-3 text-sm text-gray-500">
//                         <span
//                           className={
//                             record.reason === "On Time"
//                               ? "text-[#31b880]"
//                               : record.reason === "Late Arrival"
//                               ? "text-[#A9B024]"
//                               : "text-[#FF0606]"
//                           }
//                         >
//                           {record.reason}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-[171A1F]">
//                         {record.punishment}
//                       </td>
//                       <td className="px-8 py-3 text-sm font-medium text-right whitespace-nowrap">
//                         <button
//                           onClick={handlePopupToggle}
//                           className="bg-[#3D5AF1] text-white px-4 py-2 mr-10 rounded-full"
//                         >
//                           Claim
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//           </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SecretaryDashboard;
