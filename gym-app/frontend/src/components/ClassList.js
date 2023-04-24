import React, { useState, useEffect } from "react";
import axios from "axios";

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [token, setToken] = useState("");
  const [bookedClasses, setBookedClasses] = useState(null);
  const [userId, setUserId] = useState(null)


  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/classes/");
        setClasses(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Group the classes by day of the week and sort them by time
  const groupedClasses = classes.reduce((result, classItem) => {
    const dayIndex = new Date(classItem.date).getDay();
    const day = daysOfWeek[dayIndex];
    const time = new Date(`1970-01-01T${classItem.time}`).toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
    });

    if (!result[day]) {
      result[day] = {};
    }

    if (!result[day][time]) {
      result[day][time] = [];
    }

    result[day][time].push(classItem);

    return result;
  }, {});

  // Get the times for each day
  const timesByDay = Object.values(groupedClasses).reduce(
    (result, dayClasses) => {
      const times = Object.keys(dayClasses);
      result.push(...times);
      return result;
    },
    []
  );

  const sortedTimes = [...new Set(timesByDay)].sort(
    (a, b) => new Date(`1970-01-01T${a}`) - new Date(`1970-01-01T${b}`)
  ).reverse();

  
  const handleBook = async (classId) => {
    console.log("classId:", classId); 
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const payload = { classbook: classId, user: userId };
      const response = await axios.post(
        "http://localhost:8082/api/booked-classes/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data); 
      alert('Class Booked Successfully');
      const bookedClasses = await axios.get(`http://localhost:8082/api/booked-classes/?user=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(bookedClasses.data); 
      setBookedClasses(bookedClasses.data);        
    } catch (error) {
      console.error(error.response.data); 
    }
  };
  

  const handleLogout = () => {
    // perform logout functionality
    // for example, clear local storage and redirect to login page
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className = "body">
      <h2>Classes</h2>
      <button onClick={handleLogout}>Logout</button>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedTimes.map((time) => (
            <tr key={time}>
              <td>{time}</td>
              {daysOfWeek.map((day) => (
                <td key={`${day}-${time}`}>
                  {groupedClasses[day] &&
                  groupedClasses[day][time] &&
                  groupedClasses[day][time].length > 0 ? (
                    <ul>
                      {groupedClasses[day][time].map((classItem) => (
                        <li key={classItem._id}>
                          <h3>{classItem.title}</h3>
                          <p>{classItem.instructor}</p>
                          <p>Capacity: {classItem.maxCapacity}</p>
                          {classItem.maxCapacity - classItem.attendees.length >
                          0 ? (
                            <button onClick={() => handleBook(classItem._id,userId)}>
                              Book
                            </button>
                          ) : (
                            <p>Class is full</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No classes scheduled</p>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassList;
