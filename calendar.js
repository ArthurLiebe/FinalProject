
const Calendar = () => {
    const [date, setDate] = React.useState(new Date());

    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const renderCalendar = () => {
        let days = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="empty-day"></div>);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(
                <div key={i} className={`day ${i === date.getDate() ? 'current-day' : ''}`}>
                    {i}
                </div>
            );
        }
        return days;
    };

    return (
        <div className="calendar">
            <div className="header">
                <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))}>Prev</button>
                <h2>{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))}>Next</button>
            </div>
            <div className="days">
                <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
                {renderCalendar()}
            </div>
        </div>
    );
};
// React.useEffect(() => {
//     const handleUpdateCalendar = (event) => {
//         setDate(event.detail);
//     };
//     window.addEventListener('updateCalendar', handleUpdateCalendar);
//     return () => {
//         window.removeEventListener('updateCalendar', handleUpdateCalendar);
//     };
// }, []);


