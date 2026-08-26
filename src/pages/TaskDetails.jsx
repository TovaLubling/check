import { Link, useParams } from "react-router-dom";

function TaskDetails({ tasks }) {

    const { taskId } = useParams();

    const task = tasks.find(
        task => task.id === Number(taskId)
    );

    if (!task) {
        return (
            <div className="page">
                <h1>התרגיל לא נמצא</h1>
            </div>
        );
    }

    return (
        <div className="page">

            <Link
                to="/tasks"
                className="back-link"
            >
                ← חזרה לתרגילים
            </Link>

            <div className="details-card">

                <span className="subject-badge">
                    {task.subject}
                </span>

                <h1>
                    {task.name}
                </h1>

                <div className="details-date">
                    📅 תאריך הגשה: {task.date}
                </div>

                <hr />

                <h3>הוראות התרגיל</h3>

                <p className="description">
                    {task.desc}
                </p>

                <div className="file-box">
                    📎 {task.file}
                </div>

                <Link
                    to={`/tasks/${task.id}/submit`}
                    className="primary-btn submit-link"
                >
                    הגשת התרגיל
                </Link>

            </div>

        </div>
    );
}

export default TaskDetails;