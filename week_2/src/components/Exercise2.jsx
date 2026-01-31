import React, { useEffect, useState } from 'react'


function Exercise2() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours() % 12 || 12;
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
            setTime(`${hours}:${minutes}:${seconds} ${ampm}`);
        };
        updateTime();
        const intervalId = setInterval(updateTime, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <div className="">
                <h2>Current time now</h2>
                <div id="time">
                    {time}
                </div>
            </div>
        </>
    )
}

export default Exercise2