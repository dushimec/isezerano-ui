import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faUser, faBars, faSearch } from "@fortawesome/free-solid-svg-icons"
import Img1 from "../../../assets/eng.webp"
import Img2 from "../../../assets/rw.png"
import Img3 from "../../../assets/claim.png"
import Img4 from "../../../assets/check.png"
import Img5 from "../../../assets/calender.png"

import ProfileSidebar from "../HeroDisciplinary/ProfileSidebar"
import ProgressBar from "../ProgressBarDisciplinary/ProgressBar"
import { useCallback } from "react"
import WatchFlipCounter from "../FlipCounter/watchFlipCounter"

const Navbar = ({ handleIsPopupOpen }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState({
    code: "Eng",
    img: Img1,
    name: "English",
  })
  const [isProgressVisible, setIsProgressVisible] = useState(false)
  const [showOnlyProgress, setShowOnlyProgress] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)
  const [wordIndexMap, setWordIndexMap] = useState({});
  const words = ["On Time", "Absent", "Late Arrival",];

  const dropdownRef = useRef(null)
  const calenderRef = useRef(null)

  
  const records = [
    { No: "1", Name: "KAMARIZA Esther", punishment: "Good", Notify: "-" },
    { No: "2", Name: "HAKIZIMANA Eric", punishment: "Neglect", Notify: "-" },
    { No: "3", Name: "UMUKUNDWA Jeane", punishment: "Disrespect", Notify: "Worn" },
    { No: "4", Name: "MUMARARUNGU Jackline", punishment: "Good" , Notify: "-"},
    { No: "5", Name: "MUGISHA Bosco", punishment: "Good" , Notify: "Worn"},
  ];
  const handleClaimClick = () => {
    navigate("/claim"); // Navigate to Claim Page
  };

  const wordColors = {
    "On Time": "text-green-500 border-black", 
    "Absent": "text-red-500 border-black", 
    "Late Arrival": "text-yellow-500 border-black",
  };
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen)
  }

  const handleCheckPreviousDate = useCallback(() => {
    setIsCalendarVisible(!isCalendarVisible)
  }, [isCalendarVisible])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calenderRef.current && !calenderRef.current.contains(event.target)) {
        setIsCalendarVisible(false)
      }
    }
    if (isCalendarVisible) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isCalendarVisible])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const selectLanguage = (code, img, name) => {
    setSelectedLanguage({ code, img, name })
    setIsDropdownOpen(false)
  }

  const handleHomeClick = () => {
    setShowOnlyProgress(true)
    setIsProgressVisible(true)
    setTimeout(() => {
      setIsProgressVisible(false)
      setShowOnlyProgress(false)
    }, 3000)
  }
  const languages = [
    { code: "Eng", img: Img1, name: "Engl" },
    { code: "Kiny", img: Img2, name: "Kiny" },
  ]

  const unselectedLanguages = languages.filter((language) => language.code !== selectedLanguage.code)
  return (
    <div className="flex flex-col md:flex-row md:h-screen w-full">
      {/* Mobile Header */}
      <div className="md:hidden w-full bg-white p-4 flex justify-between items-center border-b">
        <div className="font-bold text-xl" style={{ color: "#3D5AF1" }}>
          DISCIPLINARY DASHBOARD
        </div>
         <div className="flex items-center gap-2">
          <button
            className="rounded-full p-2 flex items-center justify-center"
            onClick={toggleDropdown}
            ref={dropdownRef}
          >
            <img src={selectedLanguage.img || "/placeholder.svg"} alt={selectedLanguage.name} className="h-6 w-6" />
          </button>
          {isDropdownOpen && (
              <div
               className="absolute top-14 right-16 py-1 px-3 border rounded-md z-50"
               style={{ backgroundColor: "#3D5AF1", color: "white" }}
               >
              {unselectedLanguages.map((language) => (
                <a
                  key={language.code}
                  href={`#${language.code}`}
                  className="flex items-center justify-center gap-2 py-1 px-3"
                  onClick={() => selectLanguage(language.code, language.img, language.name)}
                >
                  <img src={language.img || "/placeholder.svg"} alt={language.name} className="inline-block h-6 w-6" />
                  {language.name}
                </a>
              ))}
            </div>
          )}
          <button className="text-[#3D5AF1] p-2" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white  p-4  ">
          <div className="fle flex-col gap-3">
            <button
              className=" py-2 px-4 rounded-full flex items-center gap-2"
              style={{ backgroundColor: "#3D5AF1", color: "white" }}
              onClick={handleHomeClick}
            >
              <FontAwesomeIcon icon={faHouse} /> Home
            </button>
            <button
              className=" mt-2 py-2 px-4 rounded-full flex items-center gap-2"
              style={{ backgroundColor: "#3D5AF1", color: "white" }}
            >
              Layout
            </button>

      
            <button
              className="mt-2 py-2 px-4 rounded-full flex items-center gap-2"
              href="#Logout"
              style={{ backgroundColor: "#3D5AF1", color: "white" }}
            >
              <FontAwesomeIcon icon={faUser} /> Logout
            </button>
          </div>
        </div>
      )}

      {/* Sidebar - Hidden on mobile */}
      {!showOnlyProgress && (
        <aside className="hidden md:flex md:flex-col md:w-1/4 lg:w-1/5">
          {/* Title */}
          <div className="bg-light mt-14">
           <a className="font-bold text-2xl block text-center" href="#" style={{ color: "#3D5AF1" }}>
              DISCIPLINARY DASHBOARD
            </a>
          </div>
           <div>
              <ProfileSidebar />
              </div>
               <div className="relative flex items-center gap-2 mt-16 ml-20">
                  {/* Date Picker Button */}
                 <button onClick={handleCheckPreviousDate} className="text-[#3D5AF1] flex items-center">
                   <img src={Img5} alt="Calendar Icon" className="w-10 h-10" />
                 </button>

                   {/* Display Selected Date */}
                   {selectedDate && (
                   <div className="text-3xl font-semibold text-black">
                    {selectedDate.toLocaleDateString()}
                    </div>
                  )}
              </div>
              <div className="ml-24">
                <WatchFlipCounter/>
              </div>
        </aside>
      )}

      {/* Main Content Section */}
      <div className="flex flex-col flex-grow md:mr-16">
        {/* Navigation Bar - Hidden on mobile */}
        {!showOnlyProgress && (
          <nav className="hidden md:flex md:items-center md:justify-end md:px-10 md:py-4">
            <ul className="flex gap-14 items-center mt-5">
              <li className="nav-item">
                <button
                  className="nav-link rounded-full flex items-center gap-4"
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
                  className="nav-link rounded-full flex items-center gap-2"
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
              <li className="nav-item relative" ref={dropdownRef}>
                <button
                  style={{
                    padding: "10px 30px",
                    backgroundColor: "#3D5AF1",
                    color: "white",
                    cursor: "pointer",
                  }}
                  className={`nav-link flex items-center justify-center gap-3 rounded-full`}
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
                    className="absolute py-1 px-3 border rounded-b-md"
                    style={{ backgroundColor: "#3D5AF1", color: "white" }}
                  >
                    {unselectedLanguages.map((language) => (
                      <a
                        key={language.code}
                        href={`#${language.code}`}
                        className="flex items-center justify-center ml-5 gap-2 py-1 px-3"
                        onClick={() => selectLanguage(language.code, language.img, language.name)}
                      >
                        <img
                          src={language.img || "/placeholder.svg"}
                          alt={language.name}
                          className="inline-block h-6 w-6"
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

        <div className="mt-5">{isProgressVisible && <ProgressBar />}</div>

        {/* Content Section */}
        <div className="flex-grow ml-10 items-center justify-center">
          {!showOnlyProgress && (
            <div className="flex-grow md:ml-20 px-4 md:px-0">
              <div className="relative flex items-center gap-5">
                <button className="flex w-full max-w-[470px] ">
                <FontAwesomeIcon className="absolute left-4 mt-3  " icon={faSearch} size="lg"  />
                <input
                 className="border border-[#3D5AF1] rounded-full w-full pl-12 pr-4 py-5 h-10" placeholder="search Choirist here" 
                 />
                 
                </button>
                <button 
                onClick={handleClaimClick} 
                className="px-5 py-1 rounded-2xl border border-[#3D5AF1] text-[#3D5AF1] text-sm md:text-base">
                  <img src={Img3} alt="" className="w-20 h-"/>
                  <h3 className="text-black">Claim</h3>
                  
                </button>
                
               

                <a href="" className="px-5 py-1 rounded-2xl text-white border border-[#3D5AF1] text-sm md:text-base">
                  <img src={Img4} alt="" className="mt-0"/>
                   <h3 className="text-black ml-7 mt-3">60%</h3>
                </a>
              </div>
              <div className="ml-10 mt-5 text-2xl font-bold">
                 List of Choirist
              </div>
             
              {/* Responsive Table */}
              <div className="overflow-x-auto mt-5 mb-20">
                <table className="w-full border rounded-md">
                  {!isPopupOpen && (
                    <thead className="bg-[#DEE1E6]">
                      <tr className="">
                        <th className="px-2 md:px-4 py-2 text-left text-xs font-medium text-[#565E6C] uppercase tracking-wider">
                          No
                        </th>
                        <th className="hidden md:table-cell   text-left text-xs font-medium text-[#565E6C] uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-2 md:px-6 py-2 text-left text-xs font-medium text-[#565E6C] uppercase tracking-wider">
                          Reason
                        </th>
                        <th className="px-2 md:px-4 py-2 text-left text-xs font-medium text-[#565E6C] uppercase tracking-wider">
                          Punishment
                        </th>
                        <th className="px-2 ml-20 md:px-1 py-2 text-left  text-xs font-medium text-[#565E6C] uppercase tracking-wider">
                          Notify
                        </th>
                      </tr>
                    </thead>
                  )}
                  <tbody className="bg-white w-20">
                  {isCalendarVisible && (
                      <div ref={calenderRef} className="absolute ml-40  mb-20 z-40 bg-white shadow-lg">
                        <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} inline />

                      </div>
                    )}
                  {records.map((record) => (
                   <tr key={record.No}>
                    <td className="px-2 md:px-4 py-2 text-xs md:text-sm text-gray-500">{record.No}</td>
                    <td className=" text-xs md:text-sm text-black font-bold">{record.Name}</td>

                     {/* Clickable Button to Change Word */}
                     <td className="px-6 py-3 text-xs md:text-sm">
                     <select
                      value={words[wordIndexMap[record.No]] || words[0]}
                      onChange={(e) =>
                        setWordIndexMap((prev) => ({
                          ...prev,
                          [record.No]: words.indexOf(e.target.value),
                        }))
                      }
                      className={`border font-semibold border-black text-sm rounded-md w-28 h-10 ${wordColors[words[wordIndexMap[record.No]] || words[0]]}`}
                    >
                      {words.map((word) => (
                        <option key={word} value={word}>
                          {word}
                        </option>
                      ))}
                    </select>
                      </td>
                      <td className="px-6 py-3 text-xs md:text-sm">{record.punishment}</td>
                        <button className="rounded-full">
                        <td className="px-6 py-3 ml-20 text-xl md:text-sm">{record.Notify}</td>

                        </button>
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
  )
}

export default Navbar

