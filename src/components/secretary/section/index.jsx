"use client";

import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import Img1 from "../../../assets/eng.webp";
import Img2 from "../../../assets/rw.png";
import Img3 from "../../../assets/question 1.png";
import ProfileSidebar from "../../disciplinary/HeroDisciplinary/ProfileSidebar";
import ProgressBar from "../../disciplinary/ProgressBarDisciplinary/ProgressBar";
import { useCallback } from "react";
const Secretary = () => {
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
  };

  const handleCheckPreviousDate = useCallback(() => {
    setIsCalendarVisible(!isCalendarVisible);
  }, [isCalendarVisible]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calenderRef.current && !calenderRef.current.contains(event.target)) {
        setIsCalendarVisible(false);
      }
    };
    if (isCalendarVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarVisible]);

  const languages = [
    { code: "Eng", img: Img1, name: "Engl" },
    { code: "Kiny", img: Img2, name: "Kiny" },
  ];

  const unselectedLanguages = languages.filter(
    (language) => language.code !== selectedLanguage.code
  );

  return (
    <div className="flex-grow ml-20">
      {!showOnlyProgress && (
        <div className="flex-grow px-4 md:ml-16 md:px-0">
          <h2 className="mt-4 text-2xl font-bold md:mt-0">Presence Details</h2>
          <div className="flex flex-wrap gap-2 mt-3">
            <button
              onClick={handleCheckPreviousDate}
              className="px-4 py-2 border border-[#3D5AF1] rounded-full text-[#3D5AF1] text-sm md:text-base"
            >
              Check Previous Date
            </button>
            <button className="px-4 py-2 rounded-full border border-[#3D5AF1] text-[#3D5AF1] text-sm md:text-base">
              Attendance 63%
            </button>
            <button className="px-4 py-2 rounded-full text-white bg-[#3D5AF1] text-sm md:text-base">
              Choir Events
            </button>
          </div>

          {/* Responsive Table */}
          <div className="mt-5 mb-20 overflow-x-auto">
            <table className="w-full border rounded-md">
              {!isPopupOpen && (
                <thead className="bg-[#DEE1E6]">
                  <tr>
                    <th className="px-2 md:px-4 py-2 text-left text-xs font-medium text-[#565E6C] uppercase tracking-wider">
                      Date
                    </th>
                    <th className="hidden md:table-cell px-6 py-2 text-left text-xs font-medium text-[#565E6C] uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-2 md:px-6 py-2 text-left text-xs font-medium text-[#565E6C] uppercase tracking-wider">
                      Reason
                    </th>
                    <th className="px-2 md:px-4 py-2 text-left text-xs font-medium text-[#565E6C] uppercase tracking-wider">
                      Punishment
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

                {[
                  {
                    date: "14/10/2024",
                    reason: "On Time",
                    punishment: "Good",
                  },
                  {
                    date: "15/10/2024",
                    reason: "Late Arrival",
                    punishment: "Neglect",
                  },
                  {
                    date: "16/10/2024",
                    reason: "Absent",
                    punishment: "Disrespect",
                  },
                  {
                    date: "17/10/2024",
                    reason: "On Time",
                    punishment: "Good",
                  },
                  {
                    date: "18/10/2024",
                    reason: "On Time",
                    punishment: "Good",
                  },
                  {
                    date: "19/10/2024",
                    reason: "On Time",
                    punishment: "Good",
                  },
                  {
                    date: "20/10/2024",
                    reason: "Late Arrival",
                    punishment: "Neglect",
                  },
                ].map((record, index) => (
                  <tr key={index}>
                    <td className="px-2 py-2 text-xs text-gray-500 md:px-4 md:text-sm">
                      {record.date}
                    </td>
                    <td className="hidden px-8 py-2 text-sm text-gray-500 md:table-cell">
                      -
                    </td>
                    <td className="px-2 py-3 text-xs md:px-6 md:text-sm">
                      <span
                        className={
                          record.reason === "On Time"
                            ? "text-[#31b880]"
                            : record.reason === "Late Arrival"
                            ? "text-[#A9B024]"
                            : "text-[#FF0606]"
                        }
                      >
                        {record.reason}
                      </span>
                    </td>
                    <td className="px-2 md:px-4 py-3 whitespace-nowrap text-xs md:text-sm text-[171A1F]">
                      {record.punishment}
                    </td>
                    <td className="px-2 py-3 text-xs font-medium text-left md:px-8 whitespace-nowrap md:text-sm">
                      <button
                        onClick={handlePopupToggle}
                        className="bg-[#3D5AF1] text-white px- py- md:px-4 md:py-2 rounded-full"
                      >
                        Claim
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
  );
};
export default Secretary;
