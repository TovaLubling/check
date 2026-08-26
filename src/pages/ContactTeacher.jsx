import { useState } from "react";
import { useUser } from "../context/UserContext";

const teachers = [
    { subject: "אלגוריתמים", name: "גב' גינסברגר" },
    { subject: "מבני נתונים", name: "גב' רייכנברג" },
    { subject: "מערכות הפעלה", name: "גב' רייכנברג" },
    { subject: "Angular", name: "גב' מייטס" },
    { subject: "תקשורת", name: "גב' היימן" }
];

function ContactTeacher() {
    const { addContactRequest } = useUser();
    const [form, setForm] = useState({ subject: "", message: "" });
    const [sent, setSent] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        const teacher = teachers.find(item => item.subject === form.subject);
        addContactRequest({
            id: Date.now(),
            subject: teacher.subject,
            teacher: teacher.name,
            message: form.message,
            status: "ממתין לתגובת המורה",
            createdAt: new Date().toLocaleDateString("he-IL")
        });
        setSent(true);
    }

    if (sent) {
        return (
            <div className="page">
                <div className="feature-card success-panel">
                    <div className="feature-icon">✉️</div>
                    <h1>הפנייה נשלחה בהצלחה</h1>
                    <p>המורה שלך תקבל את ההודעה ותענה לך בהקדם.</p>
                    <button className="primary-btn" onClick={() => setSent(false)}>שליחת פנייה נוספת</button>
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <span className="eyebrow">מרחב תקשורת</span>
                    <h1>פנייה למורה</h1>
                    <p>יש לך שאלה? אנחנו כאן כדי לעזור לך להתקדם.</p>
                </div>
                <div className="header-illustration">💬</div>
            </div>

            <div className="feature-card contact-card">
                <div className="card-intro">
                    <span className="feature-icon small">🤝</span>
                    <div>
                        <h2>איך נוכל לסייע לך?</h2>
                        <p>בחרי מקצוע וכתבי למורה הודעה ברורה ומפורטת.</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="teacher-subject">בחירת מקצוע ומורה</label>
                    <select id="teacher-subject" value={form.subject} onChange={event => setForm({ ...form, subject: event.target.value })} required>
                        <option value="">בחרי למי לפנות</option>
                        {teachers.map(teacher => <option key={teacher.subject} value={teacher.subject}>{teacher.subject} · {teacher.name}</option>)}
                    </select>
                    <label htmlFor="teacher-message">ההודעה שלך</label>
                    <textarea id="teacher-message" value={form.message} onChange={event => setForm({ ...form, message: event.target.value })} placeholder="כתבי כאן את השאלה או הפנייה שלך..." required />
                    <button className="primary-btn" type="submit">שליחת הודעה ✦</button>
                </form>
            </div>
        </div>
    );
}

export default ContactTeacher;
