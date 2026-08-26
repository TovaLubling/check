import { useState } from "react";
import { useUser } from "../context/UserContext";

function PersonalTasks() {
    const { user, addPersonalTask, togglePersonalTask } = useUser();
    const [title, setTitle] = useState("");
    const personalTasks = user?.personalTasks || [];

    function addTask(event) {
        event.preventDefault();
        if (!title.trim()) return;
        addPersonalTask({ id: Date.now(), title: title.trim(), done: false });
        setTitle("");
    }

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <span className="eyebrow">הארגון שלי</span>
                    <h1>רשימת המטלות שלי</h1>
                    <p>תכנני את היום שלך, משימה אחת בכל פעם.</p>
                </div>
                <div className="header-illustration">✓</div>
            </div>
            <div className="feature-card todo-card">
                <form className="todo-add" onSubmit={addTask}>
                    <input value={title} onChange={event => setTitle(event.target.value)} placeholder="הוסיפי מטלה חדשה..." aria-label="מטלה חדשה" />
                    <button className="primary-btn" type="submit">+ הוספה</button>
                </form>
                <div className="todo-summary"><span>{personalTasks.filter(task => !task.done).length} מטלות לביצוע</span><span>{personalTasks.filter(task => task.done).length} הושלמו</span></div>
                <div className="todo-list">
                    {personalTasks.length === 0 ? <div className="empty-todo"><span>🌱</span><h2>הכל מתחיל ממשימה אחת</h2><p>הוסיפי לעצמך יעד קטן והתחילי לזוז קדימה.</p></div> : personalTasks.map(task => (
                        <label className={`todo-item ${task.done ? "done" : ""}`} key={task.id}>
                            <input type="checkbox" checked={task.done} onChange={() => togglePersonalTask(task.id)} />
                            <span className="checkmark">✓</span>
                            <span>{task.title}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PersonalTasks;
