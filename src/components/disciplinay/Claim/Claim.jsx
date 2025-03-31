import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faUser, faBars, faSearch } from "@fortawesome/free-solid-svg-icons"
import Img1 from "../../../assets/eng.webp"
import Img2 from "../../../assets/rw.png"
import ProgressBar from "../ProgressBarDisciplinary/ProgressBar"

const Claim = () => {
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
  const [wordIndexMap, setWordIndexMap] = useState({});
  const words = ["On Time", "Absent", "Late Arrival",];

  const dropdownRef = useRef(null)

  const changeWord = (rowNo) => {
    setWordIndexMap((prev) => ({
      ...prev,
      [rowNo]: (prev[rowNo] + 1) % words.length || 0, // Cycle through words
    }));
  };
  const records = [
    { No: "1", Name: "KAMARIZA Esther", Date: "12/03/2025", Claim: "Narindwaye", Reason:"Absent" },
    { No: "2", Name: "HAKIZIMANA Eric", Date: "02/03/2025", Claim: "Ntabwo namenyeko dufite repetion",  Reason:"On Time" },
    { No: "3", Name: "UMUKUNDWA Jeane", Date: "20/02/2025", Claim: "Naje nkerewe", Reason:"Late Arrival" },
  ];
  const wordColors = {
    "On Time": "text-green-500 border-black", 
    "Absent": "text-red-500 border-black", 
    "Late Arrival": "text-yellow-500 border-black",
  };
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
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
        <div className="font-bold text-xl " style={{ color: "#3D5AF1" }}>
          DISCIPLINARY  DASHBOARD
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
      {/* Main Content Section */}
      <div className="flex flex-col flex-grow md:mr-16">
        {/* Navigation Bar - Hidden on mobile */}
        {!showOnlyProgress && (         
          <nav className="hidden md:flex md:items-center md:justify-end md:px-10 md:py-4">
          <div className=" text-2xl  font-bold  font mr-80 mt- " style={{ color: "#3D5AF1" }}>
            DISCIPLINARY DASHBOARD
           <div className="mt-10 text-black"> 
           Claims
           </div>
          </div>
        
            <ul className="flex gap-14 items-center ">          
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
                        className="flex items-center justify-center gap-2 py-1 px-3"
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
            <div className="flex-grow  md:ml-20 px-4 md:px-0">
             <div className="flex justify-center w-full mt-5">
              <div className="relative flex items-center w-full max-w-[470px]">
               <input
                className="border border-[#3D5AF1] rounded-full w-full pl-12 pr-4 py-3 h-12"
                placeholder="Search Choirist here"
                />
               <button className="absolute left-4 text-black">
               <FontAwesomeIcon icon={faSearch} size="lg" />
               </button>
              </div>
             </div>         
              {/* Responsive Table */}
              <div className="overflow-x-auto  mt-10 mb-20">
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
                          Date
                        </th>
                        <th className="px-2 md:px-4 py-2 text-left text-xs font-medium text-[#565E6C] uppercase tracking-wider">
                          Claim
                        </th>
                        <th className="px-2  md:px-4 py-2 text-left  text-xs font-medium text-[#565E6C] uppercase tracking-wider">
                          Reason
                        </th>
                      </tr>
                    </thead>
                  )}
                  <tbody className="bg-white w-20">
                  {records.map((record) => (
                   <tr key={record.No}>
                    <td className="px-2 md:px-4 py-2 text-xs md:text-sm text-gray-500">{record.No}</td>
                    <td className=" text-xs md:text-sm text-black font-bold">{record.Name}</td>

                   
                      <td className="px-6 py-3 text-xs md:text-sm">{record.Date}</td>
                        <button className="rounded-full">
                        <td className="px-6 py-3 ml-20 text-xl md:text-sm">{record.Claim}</td>

                        </button>
                          {/* Clickable Button to Change Word */}
                       <td className=" text-xs md:text-sm">
                        <button
                         onClick={() => changeWord(record.No)}
                         className={` font-semibold  text-sm rounded-md w-20 h-10 ${wordColors[words[wordIndexMap[record.No]] || words[0]]}`}
                         >
                        {words[wordIndexMap[record.No]] || words[0]} {/* Default word */}
                       </button>
                      </td>
                     </tr>
                     ))}
                     
                  </tbody>
                </table>
                <div className="mt-10 flex items-center justify-center">
                 <button onClick={() => navigate(-1)} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                   ← Go Back
                 </button>
                   {/* Claim Page Content */}
               </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Claim

