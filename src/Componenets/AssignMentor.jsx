import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UseAppState } from "../Context/AppContext";

function AssignMentor() {
  const { studentId } = useParams();
  const [isDisabled, setIsDisabled] = useState(false);

  const { allMentorsData, studentData, setStudentData } = UseAppState();
  const [specifyStudentData, setSpecifyStudentData] = useState({});
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_ASSIGN_MENTOR_BASE_API_URL}/${
        import.meta.env.VITE_STUDENT_BASE_URL
      }/${studentId}`
    )
      .then((res) => res.json())
      .then((data) => setSpecifyStudentData(data.data))
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
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {allMentorsData?.length <= 0 || !allMentorsData ? (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td
                  colSpan={4}
                  className="text-center text-gray-900 dark:text-white py-2"
                >
                  No Records found
                </td>
              </tr>
            ) : (
              allMentorsData.map((val, index) => {
                if (!specifyStudentData.mentor_id) {
                  return (
                    <RenderMentorsDetails
                      isDisabled={isDisabled}
                      setIsDisabled={setIsDisabled}
                      val={val}
                      index={index}
                      key={index}
                      specifyStudentData={specifyStudentData}
                      setSpecifyStudentData={setSpecifyStudentData}
                      studentData={studentData}
                      setStudentData={setStudentData}
                    />
                  );
                } else {
                  if (val._id != specifyStudentData.mentor_id._id) {
                    return (
                      <RenderMentorsDetails
                        isDisabled={isDisabled}
                        setIsDisabled={setIsDisabled}
                        val={val}
                        index={index}
                        key={index}
                        specifyStudentData={specifyStudentData}
                        setSpecifyStudentData={setSpecifyStudentData}
                        studentData={studentData}
                        setStudentData={setStudentData}
                      />
                    );
                  }
                }
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RenderMentorsDetails({
  val,
  index,
  specifyStudentData,
  isDisabled,
  setIsDisabled,
  studentData,
  setStudentData,
}) {
  const navigate = useNavigate();

  function handleAssignMentor(mentorId, mentorName) {
    const studentId = specifyStudentData._id;
    setIsDisabled(true);
    fetch(
      `${import.meta.env.VITE_ASSIGN_MENTOR_BASE_API_URL}/${
        import.meta.env.VITE_STUDENT_BASE_URL
      }/assignMentor/${studentId}`,
      {
        method: "PUT",
        body: JSON.stringify({ mentor_id: mentorId }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const findStudent = studentData.find(
          (student) => student._id == studentId
        );
        const indexOfStudent = studentData.indexOf(findStudent);
        studentData[indexOfStudent] = {
          ...specifyStudentData,
          mentor_id: {
            ...specifyStudentData.mentor_id,
            _id: mentorId,
            mentor_name: mentorName,
          },
        };
        setStudentData(studentData);
        navigate("/student");
      });
  }

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
      <td className="px-6 py-4">
        <button
          className="dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 hover:border-gray-600 dark:focus:ring-gray-700 text-gray-900 focus:ring-gray-200 hover:bg-gray-100 bg-white border-gray-300 flex border items-center gap-1 text-xs focus:outline-none focus:ring-4 font-medium rounded-full py-2 px-2 disabled:bg-gray-400"
          onClick={() => handleAssignMentor(val._id, val.mentor_name)}
          disabled={isDisabled}
        >
          Assign to {specifyStudentData.student_name}
        </button>
      </td>
    </tr>
  );
}

export default AssignMentor;
