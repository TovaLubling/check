import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/TaskDetails";
import SubmitTask from "./pages/SubmitTask";
import Grades from "./pages/Grades";
import CreateTask from "./pages/CreateTask";
import TeacherGrades from "./pages/TeacherGrades";
import ContactTeacher from "./pages/ContactTeacher";
import PersonalArea from "./pages/PersonalArea";
import PersonalTasks from "./pages/PersonalTasks";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

function App() {

    const tasks = [
        {
            id: 1,
            subject: "אלגוריתמים",
            date: "2026-09-01",
            name: "ניתוח סיבוכיות",
            desc: "נתחו את סיבוכיות הזמן של האלגוריתמים המצורפים.",
            file: "algorithms-task.pdf"
        },
        {
            id: 2,
            subject: "מבני נתונים",
            date: "2026-09-04",
            name: "עצים בינאריים",
            desc: "ממשו פעולות חיפוש והכנסה בעץ חיפוש בינארי.",
            file: "data-structures.pdf"
        },
        {
            id: 3,
            subject: "מערכות הפעלה",
            date: "2026-09-07",
            name: "תזמון תהליכים",
            desc: "השוו בין אלגוריתמים שונים לתזמון תהליכים.",
            file: "operating-systems.pdf"
        },
        {
            id: 4,
            subject: "Angular",
            date: "2026-09-10",
            name: "קומפוננטות ו־Services",
            desc: "בנו ממשק Angular מודולרי עם ניהול נתונים נכון.",
            file: "angular-task.pdf"
        },
        {
            id: 5,
            subject: "תקשורת",
            date: "2026-09-13",
            name: "פרוטוקולי תקשורת",
            desc: "השוו בין מודל ה־OSI למודל TCP/IP.",
            file: "communication.pdf"
        }
    ];

    return (
        <Routes>

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }
            >

                <Route
                    index
                    element={<Tasks tasks={tasks} />}
                />

                <Route
                    path="tasks"
                    element={<Tasks tasks={tasks} />}
                />

                <Route
                    path="tasks/:taskId"
                    element={<TaskDetails tasks={tasks} />}
                />

                <Route
                    path="tasks/:taskId/submit"
                    element={<SubmitTask tasks={tasks} />}
                />

                <Route
                    path="grades"
                    element={<Grades />}
                />

                <Route
                    path="contact-teacher"
                    element={<ContactTeacher />}
                />

                <Route
                    path="personal-area"
                    element={<PersonalArea />}
                />

                <Route
                    path="personal-tasks"
                    element={<PersonalTasks />}
                />

                <Route
                    path="create-task"
                    element={<CreateTask />}
                />

                <Route
                    path="teacher/grades"
                    element={<TeacherGrades />}
                />

            </Route>

        </Routes>
    );
}

export default App;