import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Navbar() {

    const { user, logout } = useUser();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <nav className="navbar">

            <Link to="/" className="logo">
                📚 הנדסת תוכנה תשפ"ז
            </Link>

            <div className="nav-links">

                <Link to="/tasks">
                    תרגילים
                </Link>

                {user?.role === "student" && (
                    <>
                        <Link to="/grades">הציונים שלי</Link>
                        <Link to="/personal-tasks">המשימות שלי</Link>
                        <Link to="/contact-teacher">פנייה למורה</Link>
                    </>
                )}

                {user?.role === "teacher" && (
                    <>
                        <Link to="/create-task">
                            תרגיל חדש
                        </Link>

                        <Link to="/teacher/grades">
                            ציונים
                        </Link>
                    </>
                )}

            </div>

            <div className="user-area">

                {user?.role === "student" && (
                    <Link to="/personal-area" className="avatar-link">
                        {user.avatar ? (
                            <img src={user.avatar} alt="תמונת פרופיל" />
                        ) : (
                            <span>{user.username?.charAt(0)?.toUpperCase()}</span>
                        )}
                    </Link>
                )}

                <span>
                    שלום, {user?.username}
                </span>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    יציאה
                </button>

            </div>

        </nav>
    );
}

export default Navbar;