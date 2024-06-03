import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseAppState } from "../Context/AppContext";

function MentorPage() {
  const navigate = useNavigate();
  const [isMentorLoading, setIsMentorLoading] = useState(false);
  const [allMentorsData, setAllMentorsData] = useState([]);
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
  }, []);
  return (
    <div className="grid place-content-center mt-10">
      <div className="grid place-content-center">
        <button
          type="button"
          className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-10 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 flex place-items-center gap-1"
          onClick={() => navigate("/mentor/create")}
        >
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-black dark:stroke-white"
            stroke="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                className="stroke-black dark:stroke-white"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
              ></path>{" "}
              <path
                className="stroke-black dark:stroke-white"
                d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
              ></path>{" "}
            </g>
          </svg>
          <span>Create mentor</span>
        </button>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Mentor Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Students
              </th>
              <th scope="col" className="px-6 py-3">
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {isMentorLoading && (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td
                  colSpan={5}
                  className="text-center text-gray-900 dark:text-white py-2"
                >
                  <div role="status" className="flex justify-center">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </td>
              </tr>
            )}
            {(allMentorsData.length <= 0 || !allMentorsData) &&
            !isMentorLoading ? (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td
                  colSpan={5}
                  className="text-center text-gray-900 dark:text-white py-2"
                >
                  No Records Found
                </td>
              </tr>
            ) : (
              allMentorsData.map((val, index) => (
                <RenderMentorDetails val={val} index={index} key={index} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RenderMentorDetails({ val, index }) {
  const navigate = useNavigate();
  const student_name = [];

  function getStudentsName() {
    val.students.forEach((student) => student_name.push(student.student_name));
  }
  if (val.students.length > 0) {
    getStudentsName();
  } else student_name.push("No records found");
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {index + 1}
      </th>
      <td className="px-6 py-4">{val.mentor_name}</td>
      <td className="px-6 py-4">{val?.mentor_email || "No Email"}</td>
      <td className="px-6 py-4">{student_name.join(", ")}</td>
      <td className="px-6 py-4 flex flex-row gap-2">
        <Link
          to={`/mentor/edit/${val._id}`}
          state={{ isEditing: true, mentorDetails: val }}
        >
          <button
            className="dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 hover:border-gray-600 dark:focus:ring-gray-700 text-gray-900 focus:ring-gray-200 hover:bg-gray-100 bg-white border-gray-300 flex border items-center gap-1 text-xs focus:outline-none focus:ring-4 font-medium rounded-full py-2 px-2 min-w-12 justify-center"
            onClick={() => navigate(`/student/previous-mentor/${val._id}`)}
          >
            Edit
          </button>
        </Link>
        <button
          className="dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 hover:border-gray-600 dark:focus:ring-gray-700 text-gray-900 focus:ring-gray-200 hover:bg-gray-100 bg-white border-gray-300 flex border items-center gap-1 text-xs focus:outline-none focus:ring-4 font-medium rounded-full  py-2 px-2"
          onClick={() => navigate(`/mentor/assign-students/${val._id}`)}
        >
          Assign Students
        </button>
        <button
          className="dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 hover:border-gray-600 dark:focus:ring-gray-700 text-gray-900 focus:ring-gray-200 hover:bg-gray-100 bg-white border-gray-300 flex border items-center gap-1 text-xs focus:outline-none focus:ring-4 font-medium rounded-full  py-2 px-2"
          onClick={() => navigate(`/mentor/students/${val._id}`)}
        >
          View Students
        </button>
      </td>
    </tr>
  );
}

export default MentorPage;
