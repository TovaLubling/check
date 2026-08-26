function Feedback({ result }) {

    return (
        <div className="feedback-box">

            <div className="feedback-icon">
                🤖
            </div>

            <h2>
                הבדיקה החכמה הסתיימה!
            </h2>

            <p>
                הפתרון שלך התקבל בהצלחה.
            </p>

            <div className="feedback-result">

                <strong>
                    {result.title} · {result.score}/100
                </strong>

                <p>
                    {result.message}
                </p>

            </div>

        </div>
    );
}

export default Feedback;