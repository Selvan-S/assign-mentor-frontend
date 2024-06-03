import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { UseAppState } from "../Context/AppContext";

function StudentForm() {
  const { studentData, setStudentData } = UseAppState();

  const navigate = useNavigate();
  const { studentId } = useParams();
  const { state } = useLocation();
  let initialState = {
    student_name: "",
    student_email: "",
    student_course: "",
    student_batch: "",
    start_time: "08:00",
    end_time: "20:00",
  };
  let isEditing = false;
  if (state && state.isEditing) {
    isEditing = state.isEditing;
    initialState.student_name = state.studentDetails?.student_name;
    initialState.student_email = state.studentDetails?.student_email;
    initialState.student_course = state.studentDetails?.student_course;
    initialState.student_batch = state.studentDetails?.student_batch;
    initialState.start_time = state.studentDetails?.start_time || "08:00";
    initialState.end_time = state.studentDetails?.end_time || "20:00";
  }
  const [studentName, setStudentName] = useState(initialState.student_name);
  const [studentEmail, setStudentEmail] = useState(initialState.student_email);
  const [studentCourse, setStudentCourse] = useState(
    initialState.student_course
  );
  const [studentBatch, setStudentBatch] = useState(initialState.student_batch);
  const [startTime, setStartTime] = useState(initialState.start_time);
  const [endTime, setEndTime] = useState(initialState.end_time);
  const [isDisabled, setIsDisabled] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsDisabled(true);
    const findStudent = studentData.find((student) => student._id == studentId);
    const indexOfStudent = studentData.indexOf(findStudent);
    if (isEditing) {
      fetch(
        `${import.meta.env.VITE_ASSIGN_MENTOR_BASE_API_URL}/${
          import.meta.env.VITE_STUDENT_BASE_URL
        }/edit/${studentId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            student_name: studentName,
            student_email: studentEmail,
            student_course: studentCourse,
            student_batch: studentBatch,
            start_time: startTime,
            end_time: endTime,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          studentData[indexOfStudent] = { ...data.data };
          setStudentData(studentData);
          navigate("/student");
        })
        .catch((error) => console.error(error));
    } else {
      fetch(
        `${import.meta.env.VITE_ASSIGN_MENTOR_BASE_API_URL}/${
          import.meta.env.VITE_STUDENT_BASE_URL
        }/create`,
        {
          method: "POST",
          body: JSON.stringify({
            student_name: studentName,
            student_email: studentEmail,
            student_course: studentCourse,
            student_batch: studentBatch,
            start_time: startTime,
            end_time: endTime,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setStudentData([data.data, ...studentData]);
          navigate("/student");
        })
        .catch((error) => console.error(error));
    }
  }
  return (
    <div className="mt-10">
      <div className="mx-auto max-w-sm">
        <div className="flex justify-between items-center w-full">
          <Link to={"/student"}>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-blue-500 hover:disabled:disabled:bg-blue-500 flex justify-center gap-1 items-center"
            >
              <span className="text-xl">◄</span>
              <span>Back</span>
            </button>
          </Link>
          <h1 className="text-xl mr-32">
            {isEditing ? "Edit" : "Create"} Student
          </h1>
        </div>
      </div>
      <form className="max-w-sm mx-auto mt-5" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@email.com"
            required
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="course-name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Course Name
          </label>
          <input
            type="text"
            id="course-name"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            value={studentCourse}
            onChange={(e) => setStudentCourse(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="batch"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Batch
          </label>
          <input
            type="text"
            id="batch"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            value={studentBatch}
            onChange={(e) => setStudentBatch(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="start-time"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Start time
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="time"
              id="start-time"
              className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              min="08:00"
              max="20:00"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="start-time"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            End time
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="time"
              id="start-time"
              className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              min="08:00"
              max="20:00"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full disabled:bg-blue-500 hover:disabled:disabled:bg-blue-500"
          disabled={isDisabled}
        >
          {isEditing ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
