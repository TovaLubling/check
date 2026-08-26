import { useEffect, useMemo, useState } from "react";
import TaskCard from "../components/Taskcard";

const heroImages = [
    { src: "/class1.JPG", alt: "תלמידות לומדות יחד בכיתה" },
    { src: "/class2.png", alt: "תלמידות משתפות פעולה בלמידה" },
    { src: "/class3.png", alt: "תלמידות בכיתה" }
];

function Tasks({ tasks }) {

    const [subject, setSubject] = useState("");
    const [date, setDate] = useState("");
    const [heroIndex, setHeroIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setHeroIndex(currentIndex => (currentIndex + 1) % heroImages.length);
        }, 6000);

        return () => clearInterval(timer);
    }, []);

    const subjects = [...new Set(tasks.map(task => task.subject))];

    const filteredTasks = useMemo(() => {

        return tasks.filter(task => {

            const subjectMatch =
                subject === "" || task.subject === subject;

            const dateMatch =
                date === "" || task.date === date;

            return subjectMatch && dateMatch;
        });

    }, [tasks, subject, date]);

    return (
        <div className="page">

            <div className="page-header">

                <div>
                    <h1>התרגילים שלי</h1>

                    <p>
                        כל התרגילים והמשימות במקום אחד
                    </p>
                </div>

            </div>

            <section className="dashboard-hero">
                <img
                    key={heroImages[heroIndex].src}
                    className="dashboard-hero-image"
                    src={heroImages[heroIndex].src}
                    alt={heroImages[heroIndex].alt}
                />
                <div className="dashboard-hero-overlay">
                    <span className="eyebrow">לומדות יחד, מתקדמות יחד</span>
                    <h2>הדרך שלך להצלחה מתחילה כאן</h2>
                    <p>מצאי את המשימה הבאה שלך, שמרי על הקצב ותני לעצמך מקום לגדול.</p>
                </div>
                <div className="hero-sticker">✦ ביחד זה קל יותר</div>
                <div className="hero-dots" aria-label="בחירת תמונת פתיחה">
                    {heroImages.map((image, index) => (
                        <button
                            key={image.src}
                            className={index === heroIndex ? "active" : ""}
                            onClick={() => setHeroIndex(index)}
                            aria-label={`תמונה ${index + 1}`}
                        />
                    ))}
                </div>
            </section>

            <div className="filters">

                <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                >
                    <option value="">כל המקצועות</option>

                    {subjects.map(subjectName => (
                        <option
                            key={subjectName}
                            value={subjectName}
                        >
                            {subjectName}
                        </option>
                    ))}
                </select>

                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <button
                    className="clear-btn"
                    onClick={() => {
                        setSubject("");
                        setDate("");
                    }}
                >
                    ניקוי
                </button>

            </div>

            <div className="tasks-grid">

                {filteredTasks.length > 0 ? (

                    filteredTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                        />
                    ))

                ) : (

                    <div className="empty-state">
                        לא נמצאו תרגילים
                    </div>

                )}

            </div>

        </div>
    );
}

export default Tasks;