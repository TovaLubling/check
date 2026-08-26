function TeacherGrades() {

    const students = [
        {
            name: "שרה כהן",
            task: "משוואות ממעלה ראשונה",
            mark: 95
        },
        {
            name: "רחל לוי",
            task: "משוואות ממעלה ראשונה",
            mark: 87
        },
        {
            name: "לאה ישראלי",
            task: "משוואות ממעלה ראשונה",
            mark: 100
        }
    ];

    return (
        <div className="page">

            <div className="page-header">

                <div>
                    <h1>ציוני תלמידות 📊</h1>

                    <p>
                        צפייה בציונים ובהגשות
                    </p>
                </div>

            </div>

            <div className="grades-table">

                <div className="table-header">
                    <span>תלמידה</span>
                    <span>תרגיל</span>
                    <span>ציון</span>
                </div>

                {students.map((student, index) => (

                    <div
                        className="table-row"
                        key={index}
                    >

                        <span>
                            {student.name}
                        </span>

                        <span>
                            {student.task}
                        </span>

                        <strong>
                            {student.mark}
                        </strong>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default TeacherGrades;