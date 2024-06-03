import React, { createContext, useContext, useEffect, useState } from "react";

export const AppCtx = createContext();

function AppContext({ children }) {
  const [allMentorsData, setAllMentorsData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [isMentorLoading, setIsMentorLoading] = useState(false);
  const [isStudentLoading, setIsStudentLoading] = useState(false);

  useEffect(() => {
    setIsMentorLoading(true);
    // Fetch All Mentor Data
    fetch(
      `${import.meta.env.VITE_ASSIGN_MENTOR_BASE_API_URL}/${
        import.meta.env.VITE_MENTOR_BASE_URL
      }/all`,
      { method: "GET" }
    )
      .then((res) => res.json())
      .then((data) => {
        setAllMentorsData(data.data);
        setIsMentorLoading(false);
      })
      .catch((error) => console.error(error));

    //   Fetch All Student data
    setIsStudentLoading(true);
    fetch(
      `${import.meta.env.VITE_ASSIGN_MENTOR_BASE_API_URL}/${
        import.meta.env.VITE_STUDENT_BASE_URL
      }/all`,
      { method: "GET" }
    )
      .then((res) => res.json())
      .then((data) => {
        setStudentData(data.data);
        setIsStudentLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <AppCtx.Provider
        value={{
          allMentorsData,
          setAllMentorsData,
          setStudentData,
          studentData,
          isMentorLoading,
          isStudentLoading,
        }}
      >
        {children}
      </AppCtx.Provider>
    </div>
  );
}

export default AppContext;

export function UseAppState() {
  return useContext(AppCtx);
}
