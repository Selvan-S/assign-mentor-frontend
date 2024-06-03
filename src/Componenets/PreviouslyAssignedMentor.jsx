import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function PreviouslyAssignedMentor() {
  const { studentId } = useParams();
  const [previouslyAssignedMentor, setPreviouslyAssignedMentor] = useState([]);
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_ASSIGN_MENTOR_BASE_API_URL}/${
        import.meta.env.VITE_STUDENT_BASE_URL
      }/previousMentors/${studentId}`,
      { method: "GET" }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else
          setPreviouslyAssignedMentor(data.data.previously_assigned_mentor);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="grid place-content-center mt-10">
      <div className="mb-4">
        <Link to={"/student"}>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-blue-500 hover:disabled:disabled:bg-blue-500 flex justify-center gap-1 items-center"
          >
            <span className="text-xl">◄</span>
            <span>Back</span>
          </button>
        </Link>
      </div>
      <div className="relative overflow-x-auto">
        <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Mentor Name
              </th>
              <th scope="col" className="px-6 py-3">
                Mentor Email
              </th>
            </tr>
          </thead>
          <tbody>
            {previouslyAssignedMentor?.length <= 0 ||
            !previouslyAssignedMentor ? (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td
                  colSpan={3}
                  className="text-center text-gray-900 dark:text-white py-2"
                >
                  No Records found
                </td>
              </tr>
            ) : (
              previouslyAssignedMentor.map((val, index) => (
                <RenderMentorsDetails val={val} index={index} key={index} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RenderMentorsDetails({ val, index }) {
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
    </tr>
  );
}

export default PreviouslyAssignedMentor;
