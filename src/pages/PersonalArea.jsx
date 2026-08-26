import { useRef, useState } from "react";
import { useUser } from "../context/UserContext";

function PersonalArea() {
    const { user, updateProfile } = useUser();
    const fileInput = useRef(null);
    const [saved, setSaved] = useState(false);
    const contactRequests = user?.contactRequests || [];

    function handleAvatar(event) {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => updateProfile({ avatar: reader.result });
        reader.readAsDataURL(file);
    }

    function saveProfile(event) {
        event.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 2200);
    }

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <span className="eyebrow">המרחב שלי</span>
                    <h1>האזור האישי</h1>
                    <p>המקום שלך לנהל את הפרטים, ההעדפות והלמידה שלך.</p>
                </div>
            </div>
            <div className="profile-layout">
                <section className="feature-card profile-hero">
                    <div className="profile-avatar large" onClick={() => fileInput.current?.click()}>
                        {user?.avatar ? <img src={user.avatar} alt="תמונת הפרופיל שלך" /> : <span>{user?.username?.charAt(0)?.toUpperCase()}</span>}
                        <b>＋</b>
                    </div>
                    <h2>{user?.username || "התלמידה שלי"}</h2>
                    <p>תלמידה פעילה בהנדסת תוכנה תשפ"ז</p>
                    <button className="secondary-btn" onClick={() => fileInput.current?.click()}>העלאת תמונת פרופיל</button>
                    <input ref={fileInput} className="visually-hidden" type="file" accept="image/*" onChange={handleAvatar} />
                </section>
                <section className="feature-card profile-form">
                    <div className="card-heading"><span>פרטי חשבון</span><strong>✎</strong></div>
                    <form onSubmit={saveProfile}>
                        <label htmlFor="profile-name">שם משתמש</label>
                        <input id="profile-name" defaultValue={user?.username || ""} />
                        <label htmlFor="profile-email">כתובת אימייל</label>
                        <input id="profile-email" type="email" defaultValue={user?.email || ""} />
                        <button className="primary-btn" type="submit">שמירת שינויים</button>
                        {saved && <span className="save-note">✓ הפרטים נשמרו</span>}
                    </form>
                </section>
            </div>
            <section className="feature-card requests-panel">
                <div className="card-heading">
                    <span>הפניות שלי</span>
                    <strong>✉</strong>
                </div>
                {contactRequests.length === 0 ? (
                    <div className="requests-empty">עדיין לא שלחת פנייה למורה.</div>
                ) : (
                    <div className="requests-list">
                        {contactRequests.map(request => (
                            <article className="request-item" key={request.id}>
                                <div>
                                    <span className="subject-badge">{request.subject}</span>
                                    <h3>{request.teacher}</h3>
                                    <p>{request.message}</p>
                                    <small>{request.createdAt}</small>
                                </div>
                                <span className="request-status">{request.status}</span>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default PersonalArea;
