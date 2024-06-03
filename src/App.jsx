import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NavBar from "./Componenets/NavBar";
import MentorPage from "./pages/MentorPage";
import StudentPage from "./pages/StudentPage";
import AssignStudents from "./Componenets/AssignStudents";
import ViewStudentsOfAMentor from "./Componenets/ViewStudentsOfAMentor";
import AssignMentor from "./Componenets/AssignMentor";
import PreviouslyAssignedMentor from "./Componenets/PreviouslyAssignedMentor";
import MentorForm from "./Componenets/MentorForm";
import StudentForm from "./Componenets/StudentForm";

function App() {
  return (
    <div className="h-screen">
      <NavBar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/mentor" element={<MentorPage />} />
        <Route path="/mentor/create" element={<MentorForm />} />
        <Route path="/mentor/edit/:mentorId" element={<MentorForm />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/student/create" element={<StudentForm />} />
        <Route path="/student/edit/:studentId" element={<StudentForm />} />
        <Route
          path="/mentor/assign-students/:mentorId"
          element={<AssignStudents />}
        />
        <Route
          path="/mentor/students/:mentorId"
          element={<ViewStudentsOfAMentor />}
        />
        <Route
          path="/student/assign-mentor/:studentId"
          element={<AssignMentor />}
        />
        <Route
          path="/student/previous-mentor/:studentId"
          element={<PreviouslyAssignedMentor />}
        />
      </Routes>
    </div>
  );
}

export default App;
