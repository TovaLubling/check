import { useState } from "react";

function CreateTask() {

    const [form, setForm] = useState({
        subject: "",
        name: "",
        date: "",
        desc: ""
    });

    const [created, setCreated] = useState(false);

    function handleChange(e) {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {

        e.preventDefault();

        setCreated(true);
    }

    return (
        <div className="page">

            <div className="page-header">
                <div>
                    <h1>יצירת תרגיל חדש ✨</h1>
                    <p>
                        הוסיפי תרגיל חדש לתלמידות
                    </p>
                </div>
            </div>

            <div className="form-card">

                {created ? (

                    <div className="success-message">
                        <div>✅</div>

                        <h2>
                            התרגיל נוצר בהצלחה!
                        </h2>

                        <p>
                            התרגיל נוסף למערכת.
                        </p>
                    </div>

                ) : (

                    <form onSubmit={handleSubmit}>

                        <label>מקצוע</label>

                        <select
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            required
                        >
                            <option value="">
                                בחרי מקצוע
                            </option>

                            <option>אלגוריתמים</option>
                            <option>מבני נתונים</option>
                            <option>מערכות הפעלה</option>
                            <option>Angular</option>
                            <option>תקשורת</option>
                        </select>

                        <label>שם התרגיל</label>

                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="לדוגמה: מימוש עץ בינארי"
                            required
                        />

                        <label>תאריך הגשה</label>

                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            required
                        />

                        <label>תיאור</label>

                        <textarea
                            name="desc"
                            value={form.desc}
                            onChange={handleChange}
                            placeholder="כתבי את הוראות התרגיל..."
                            required
                        />

                        <label>קובץ</label>

                        <input type="file" />

                        <button className="primary-btn">
                            יצירת תרגיל
                        </button>

                    </form>

                )}

            </div>

        </div>
    );
}

export default CreateTask;