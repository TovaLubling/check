import { useUser } from "../context/UserContext";

function Grades() {

    const { user } = useUser();

    const marks = [
        {
            taskId: 1,
            taskName: "ניתוח סיבוכיות",
            subject: "אלגוריתמים",
            mark: 95,
            desc: "עבודה מצוינת!"
        },
        {
            taskId: 2,
            taskName: "עצים בינאריים",
            subject: "מבני נתונים",
            mark: 88,
            desc: "עבודה טובה מאוד."
        },
        {
            taskId: 3,
            taskName: "תזמון תהליכים",
            subject: "מערכות הפעלה",
            mark: 100,
            desc: "פתרון מעולה!"
        }
    ];

    return (
        <div className="page">

            <div className="page-header">

                <div>
                    <h1>הציונים שלי 🎓</h1>

                    <p>
                        שלום {user?.username}, כאן תוכלי לראות
                        את הציונים והמשובים שלך.
                    </p>
                </div>

            </div>

            <div className="grades-grid">

                {marks.map(mark => (

                    <div
                        className="grade-card"
                        key={mark.taskId}
                    >

                        <div>
                            <span className="subject-badge">
                                {mark.subject}
                            </span>

                            <h3>
                                {mark.taskName}
                            </h3>

                            <p>
                                {mark.desc}
                            </p>
                        </div>

                        <div className="grade-number">
                            {mark.mark}
                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Grades;