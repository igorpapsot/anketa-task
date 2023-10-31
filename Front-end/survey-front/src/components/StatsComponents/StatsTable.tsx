const StatsTable = ({ grades }: { grades: Grade[] }) => {

    const getAverageGrade = (original: boolean) => {
        let avg = 0
        grades.forEach(grade => {
            if (original) {
                avg = avg + grade.originalScore
                return
            }
            avg = avg + grade.value
        });
        avg = avg / grades.length
        return avg.toFixed(2)
    }

    return (
        <table className="gradeTable">
            <thead>
                <tr>
                    <th>Submission</th>
                    <th>Original grade</th>
                    <th>Grade</th>
                </tr>
            </thead>
            <tbody>
                {grades.map((g: Grade, i: number) => (
                    <tr key={g.submissionId}>
                        <td>{i + 1}</td>
                        <td>{g.originalScore}</td>
                        <td>{g.value}</td>
                    </tr>
                ))}
                <tr>
                    <td className="average-row">Average</td>
                    <td className="average-row">{getAverageGrade(true)}</td>
                    <td className="average-row">{getAverageGrade(false)}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default StatsTable