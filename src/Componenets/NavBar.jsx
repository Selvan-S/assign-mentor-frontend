import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [isActive, setIsActive] = useState(false);

  return (
    <nav className={`border-gray-200 px-5 m-0 pt-4`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto max-sm:flex-col max-sm:gap-3">
        <Link
          to={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span
            className={`
               dark:text-white text-gray-900
             self-center text-2xl font-semibold whitespace-nowrap`}
          >
            Assign Mentor and Student
          </span>
        </Link>
        <div className="flex gap-6 items-center">
          <div className="max-md:block md:hidden"></div>
          <button
            onClick={() => setIsActive(!isActive)}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isActive ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul
            className={`font-medium flex flex-col p-4 md:p-0 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:border-0`}
          >
            <li>
              <Link
                to={"/mentor"}
                className={`               
                     dark:hover:text-white dark:text-blue-500
                     text-gray-900 hover:text-blue-700
                 max-md:block max-md:px-3 max-md:py-2 max-md:hover:text-white max-md:hover:bg-blue-700 text-lg max-md:text-base`}
                aria-current="page"
              >
                Mentor
              </Link>
            </li>
            <li>
              <Link
                to={"/student"}
                className={`
                  
                    dark:hover:text-white dark:text-blue-500
                    text-gray-900 hover:text-blue-700
                 max-md:block max-md:px-3 max-md:py-2 max-md:hover:text-white max-md:hover:bg-blue-700 text-lg max-md:text-base`}
                aria-current="page"
              >
                Student
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
