import { useState } from "react";
import { useParams } from "react-router-dom";
import Feedback from "../components/Feedback";

const feedbackOptions = [
    {
        title: "מעולה",
        score: 98,
        message: "פתרון מדויק ומסודר. רואים שליטה מצוינת בחומר, המשיכי כך!"
    },
    {
        title: "טוב מאוד",
        score: 88,
        message: "עבודה טובה עם חשיבה נכונה. עוד כמה דיוקים קטנים והפתרון יהיה מושלם."
    },
    {
        title: "כמעט שם",
        score: 76,
        message: "הכיוון נכון ויש בסיס טוב. כדאי לחזור על השלבים ולחדד את ההסבר."
    },
    {
        title: "טעון שיפור",
        score: 64,
        message: "יש כמה נקודות שכדאי לתקן. עברי שוב על החומר ונסי לפרק את השאלה לשלבים."
    },
    {
        title: "כדאי לנסות שוב",
        score: 52,
        message: "הפתרון עדיין לא שלם, אבל זו הזדמנות טובה ללמוד. בדקי את ההגדרות והדוגמאות."
    }
];

function SubmitTask({ tasks }) {

    const { taskId } = useParams();

    const task = tasks.find(
        task => task.id === Number(taskId)
    );

    const [answer, setAnswer] = useState("");
    const [file, setFile] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [feedbackResult, setFeedbackResult] = useState(null);

    function handleSubmit(e) {

        e.preventDefault();

        if (!answer && !file) {
            alert("יש להגיש תשובה או קובץ");
            return;
        }

        const randomIndex = Math.floor(Math.random() * feedbackOptions.length);
        const result = feedbackOptions[randomIndex];
        setFeedbackResult(result);
        setSubmitted(true);
    }

    return (
        <div className="page">

            <div className="submit-card">

                <span className="subject-badge">
                    {task?.subject}
                </span>

                <h1>
                    הגשת: {task?.name}
                </h1>

                {!submitted ? (

                    <form onSubmit={handleSubmit}>

                        <label>
                            כתיבת פתרון
                        </label>

                        <textarea
                            value={answer}
                            onChange={(e) =>
                                setAnswer(e.target.value)
                            }
                            placeholder="כתבי כאן את הפתרון שלך..."
                        />

                        <label>
                            או העלאת קובץ
                        </label>

                        <input
                            type="file"
                            onChange={(e) =>
                                setFile(e.target.files[0])
                            }
                        />

                        <button className="primary-btn">
                            שליחת התרגיל לבדיקה
                        </button>

                    </form>

                ) : (

                    <Feedback result={feedbackResult} />

                )}

            </div>

        </div>
    );
}

export default SubmitTask;