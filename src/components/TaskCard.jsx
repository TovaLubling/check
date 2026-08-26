import { Link } from "react-router-dom";

function TaskCard({ task }) {

    return (
        <div className="task-card">

            <div className="task-icon">
                📘
            </div>

            <span className="subject-badge">
                {task.subject}
            </span>

            <h2>
                {task.name}
            </h2>

            <p>
                {task.desc}
            </p>

            <div className="task-date">
                📅 {task.date}
            </div>

            <Link
                to={`/tasks/${task.id}`}
                className="details-btn"
            >
                לצפייה בתרגיל ←
            </Link>

        </div>
    );
}

export default TaskCard;