import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Login() {

    const { authenticate, registerUser } = useUser();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("student");
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState("");

    function handleSubmit(e) {

        e.preventDefault();
        setError("");

        if (!username || !password || (isRegistering && (!email || !confirmPassword))) {
            setError("יש למלא את כל השדות");
            return;
        }

        if (isRegistering) {
            if (password !== confirmPassword) {
                setError("הסיסמאות לא תואמות");
                return;
            }

            const registered = registerUser({ username, email, password, role });
            if (!registered) {
                setError("שם המשתמש כבר קיים. נסי שם אחר");
                return;
            }
        } else if (!authenticate(username, password, role)) {
            setError("הפרטים לא נמצאו במערכת. עברי להרשמה כדי ליצור חשבון חדש");
            return;
        }

        navigate("/");
    }

    function switchMode() {
        setIsRegistering(currentMode => !currentMode);
        setError("");
        setPassword("");
        setConfirmPassword("");
    }

    return (
        <div className="login-page">
            <div className="login-shell">
                <section className="login-showcase">
                    <div className="showcase-orb orb-one" />
                    <div className="showcase-orb orb-two" />
                    <div className="brand-mark">✦</div>
                    <span className="showcase-kicker">פלטפורמת למידה חכמה</span>
                    <h1>לומדים.<br /><em>מתקדמים.</em><br />מצליחים.</h1>
                    <p>כל מה שצריך כדי להפוך כל יום של למידה לצעד משמעותי קדימה.</p>
                    <div className="showcase-stats">
                        <div><strong>24/7</strong><span>למידה בקצב שלך</span></div>
                        <div><strong>+95%</strong><span>מעקב אחר התקדמות</span></div>
                    </div>
                    <div className="floating-note note-top">📈 ההתקדמות שלך עולה</div>
                    <div className="floating-note note-bottom">✨ כל משימה היא הישג</div>
                </section>

                <section className="login-card">
                    <div className="login-heading">
                        <div className="login-logo">📚</div>
                        <div>
                            <span className="eyebrow">{isRegistering ? "הצטרפי אלינו" : "ברוכה הבאה"}</span>
                            <h2>{isRegistering ? "טופס הרשמה" : "טופס כניסה"}</h2>
                            <p className="login-subtitle">{isRegistering ? "צרי חשבון והתחילי את המסע שלך." : "היכנסי והמשיכי בדיוק מהמקום שבו עצרת."}</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <label>שם משתמש</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="הכניסי שם משתמש" />
                        {isRegistering && (
                            <>
                                <label>כתובת אימייל</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
                            </>
                        )}
                        <label>סיסמה</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="הכניסי סיסמה" />
                        {isRegistering && (
                            <>
                                <label>אימות סיסמה</label>
                                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="הקלידי שוב את הסיסמה" />
                            </>
                        )}
                        <label>אני נכנסת בתור</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="student">תלמידה</option>
                            <option value="teacher">מורה</option>
                        </select>
                        {error && <div className="form-error" role="alert">{error}</div>}
                        <button className="primary-btn">{isRegistering ? "יצירת חשבון" : "התחברות"} <span>←</span></button>
                    </form>
                    <button className="mode-switch" type="button" onClick={switchMode}>
                        {isRegistering ? "כבר יש לך חשבון? כניסה" : "אין לך חשבון? הרשמה עכשיו"}
                    </button>
                    <div className="login-footer"><span /> מאובטח, פשוט ומותאם ללמידה <span /></div>
                </section>
            </div>
        </div>
    );
}

export default Login;