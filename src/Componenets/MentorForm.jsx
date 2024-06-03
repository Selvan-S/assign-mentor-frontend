import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

function MentorForm() {
  const navigate = useNavigate();
  const { mentorId } = useParams();
  const { state } = useLocation();
  let initialState = {
    mentor_name: "",
    mentor_email: "",
  };

  let isEditing = false;
  if (state && state.isEditing) {
    isEditing = state.isEditing;
    initialState.mentor_name = state.mentorDetails?.mentor_name;
    initialState.mentor_email = state.mentorDetails?.mentor_email;
  }
  const [mentorData, setMentorData] = useState(initialState);
  const [isDisabled, setIsDisabled] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMentorData({ ...mentorData, [name]: value });
  };
  function handleSubmit(e) {
    e.preventDefault();
    setIsDisabled(true);
    if (isEditing) {
      fetch(
        `${import.meta.env.VITE_ASSIGN_MENTOR_BASE_API_URL}/${
          import.meta.env.VITE_MENTOR_BASE_URL
        }/edit/${mentorId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            mentor_name: mentorData.mentor_name,
            mentor_email: mentorData.mentor_email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          navigate("/mentor");
        })
        .catch((error) => console.error(error));
    } else {
      fetch(
        `${import.meta.env.VITE_ASSIGN_MENTOR_BASE_API_URL}/${
          import.meta.env.VITE_MENTOR_BASE_URL
        }/create`,
        {
          method: "POST",
          body: JSON.stringify({
            mentor_name: mentorData.mentor_name,
            mentor_email: mentorData.mentor_email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          navigate("/mentor");
        })
        .catch((error) => console.error(error));
    }
  }
  return (
    <div className="mt-10">
      <div className="mx-auto max-w-sm">
        <div className="flex justify-between items-center w-full">
          <Link to={"/mentor"}>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-blue-500 hover:disabled:disabled:bg-blue-500 flex justify-center gap-1 items-center"
            >
              <span className="text-xl">◄</span>
              <span>Back</span>
            </button>
          </Link>
          <h1 className="text-xl mr-32">
            {isEditing ? "Edit" : "Create"} Mentor
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
            value={mentorData.mentor_name}
            onChange={handleInputChange}
            name="mentor_name"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@email.com"
            required
            value={mentorData.mentor_email}
            onChange={handleInputChange}
            name="mentor_email"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
          disabled={isDisabled}
        >
          {isEditing ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default MentorForm;
