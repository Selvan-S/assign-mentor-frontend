import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ViewStudentsOfAMentor() {
  const { mentorId } = useParams();
  const [studentsOfAMentor, setStudentsOfAMentor] = useState([]);
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_ASSIGN_MENTOR_BASE_API_URL}/${
        import.meta.env.VITE_STUDENT_BASE_URL
      }/all/mentor/${mentorId}`
    )
      .then((res) => res.json())
      .then((data) => setStudentsOfAMentor(data.data[0].student_list))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="grid place-content-center mt-10">
      <div className="mb-4">
        <Link to={"/mentor"}>
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
                Student Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Batch
              </th>
              <th scope="col" className="px-6 py-3">
                Course
              </th>
            </tr>
          </thead>
          <tbody>
            {studentsOfAMentor?.length <= 0 || !studentsOfAMentor ? (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td
                  colSpan={5}
                  className="text-center text-gray-900 dark:text-white py-2"
                >
                  No Records found
                </td>
              </tr>
            ) : (
              studentsOfAMentor.map((val, index) => (
                <RenderStudentsDetails val={val} index={index} key={index} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RenderStudentsDetails({ val, index }) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {index + 1}
      </th>
      <td className="px-6 py-4">{val.student_name}</td>
      <td className="px-6 py-4">{val?.student_email || "No Email"}</td>
      <td className="px-6 py-4">{val?.student_batch || "No Batch"}</td>
      <td className="px-6 py-4">{val?.student_course || "No Batch"}</td>
    </tr>
  );
}

export default ViewStudentsOfAMentor;
