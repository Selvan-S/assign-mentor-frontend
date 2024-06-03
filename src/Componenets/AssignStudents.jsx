import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function AssignStudents() {
  const { mentorId } = useParams();
  const [studentsWithoutMentor, setStudentsWithoutMentor] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [unSelectAll, setUnSelectAll] = useState(false);
  const [reFetchData, setReFetchData] = useState(false);

  useEffect(() => {
    setReFetchData(false);
    fetch(
      `${import.meta.env.VITE_ASSIGN_MENTOR_BASE_API_URL}/${
        import.meta.env.VITE_STUDENT_BASE_URL
      }/all/withoutMentor`,
      { method: "GET" }
    )
      .then((res) => res.json())
      .then((data) => {
        setStudentsWithoutMentor(data.data);
      })
      .catch((error) => console.error(error));
  }, [reFetchData]);

  function handleCancel() {
    setUnSelectAll(true);
    setSelectedStudents([]);
  }
  async function handleAddedStudents() {
    fetch(
      `${import.meta.env.VITE_ASSIGN_MENTOR_BASE_API_URL}/${
        import.meta.env.VITE_MENTOR_BASE_URL
      }/add/students/${mentorId}`,
      {
        method: "PUT",
        body: JSON.stringify({ students: [...selectedStudents] }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUnSelectAll(true);
        setSelectedStudents([]);
        setReFetchData(true);
      })
      .catch((error) => console.error(error));
  }
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
              <th scope="col" className="px-6 py-3">
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {studentsWithoutMentor?.length <= 0 || !studentsWithoutMentor ? (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td
                  colSpan={6}
                  className="text-center text-gray-900 dark:text-white py-2"
                >
                  No Records found
                </td>
              </tr>
            ) : (
              studentsWithoutMentor.map((val, index) => (
                <RenderStudentsDetails
                  val={val}
                  index={index}
                  key={index}
                  selectedStudents={selectedStudents}
                  setSelectedStudents={setSelectedStudents}
                  setUnSelectAll={setUnSelectAll}
                  unSelectAll={unSelectAll}
                />
              ))
            )}
            {selectedStudents.length > 0 ? (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                <td
                  colSpan={6}
                  className="text-center text-gray-900 dark:text-white "
                >
                  <div className="flex justify-center gap-4 py-3">
                    <button
                      className="dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 hover:border-gray-600 dark:focus:ring-gray-700 text-gray-900 focus:ring-gray-200 hover:bg-gray-100 bg-white border-gray-300 flex border items-center gap-1 text-xs focus:outline-none focus:ring-4 font-medium rounded-full py-2 px-2 min-w-32 justify-center"
                      onClick={() => handleCancel()}
                    >
                      Cancel
                    </button>
                    <button
                      className="dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 hover:border-gray-600 dark:focus:ring-gray-700 text-gray-900 focus:ring-gray-200 hover:bg-gray-100 bg-white border-gray-300 flex border items-center gap-1 text-xs focus:outline-none focus:ring-4 font-medium rounded-full py-2 px-2 min-w-32 justify-center"
                      onClick={() => handleAddedStudents()}
                    >
                      Add students
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              ""
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RenderStudentsDetails({
  val,
  index,
  setSelectedStudents,
  selectedStudents,
  unSelectAll,
  setUnSelectAll,
}) {
  const [isSelected, setIsSelected] = useState(false);
  function handleStudentSelect(isSelected) {
    if (!isSelected) {
      setSelectedStudents((previousState) => [...previousState, val._id]);
    } else {
      const filterStudent = selectedStudents.filter(
        (student) => student != val._id
      );
      setSelectedStudents([...filterStudent]);
    }
  }
  useEffect(() => {
    function checkIfUnselected(bool) {
      if (bool) {
        setIsSelected(false);
        setUnSelectAll(false);
      }
    }
    checkIfUnselected(unSelectAll);
  }, [unSelectAll]);
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
      <td className="px-6 py-4">
        <button
          className="dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 hover:border-gray-600 dark:focus:ring-gray-700 text-gray-900 focus:ring-gray-200 hover:bg-gray-100 bg-white border-gray-300 flex border items-center gap-1 text-xs focus:outline-none focus:ring-4 font-medium rounded-full  py-2 px-2 min-w-24 justify-center"
          onClick={() => {
            setIsSelected(!isSelected);
            handleStudentSelect(isSelected);
          }}
        >
          {isSelected ? "Selected" : "Select"}
        </button>
      </td>
    </tr>
  );
}

export default AssignStudents;
