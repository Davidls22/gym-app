import React, { useState, useEffect } from "react";
import axios from "axios";

const BookedClasses = () => {
  const [bookedClasses, setBookedClasses] = useState([]);

  useEffect(() => {
    const fetchBookedClasses = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        const response = await axios.get(
          `http://localhost:8082/api/booked-classes/?user=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);

        setBookedClasses(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookedClasses();
  }, []);

  const handleCancel = async (classId) => {
    console.log("classId:", classId); // Add this line
    try {
      await axios.delete(`http://localhost:8082/api/booked-classes/${classId}`);
      alert("class cancelled");
      const newBookedClasses = bookedClasses.filter(
        (bookedClass) => bookedClass._id !== classId
      );
      setBookedClasses(newBookedClasses);
    } catch (error) {
      console.error(error);
      alert("Error cancelling class");
    }
  };

  const handleLogout = () => {
    // perform logout functionality
    // for example, clear local storage and redirect to login page
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="booked-classes">
      <h2>Booked Classes</h2>
      <button onClick={handleLogout}>Logout</button>
      <table>
        <thead>
          <tr>
            <th>Class</th>
            <th>Time</th>
            <th>Instructor</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookedClasses
            .sort((a, b) => new Date(a.class.date) - new Date(b.class.date))
            .map((bookedClass) => (
              <tr key={bookedClass._id}>
                <td>{bookedClass.class.title}</td>
                <td>{bookedClass.class.time}</td>
                <td>{bookedClass.class.instructor}</td>
                <td>
                  {new Date(bookedClass.class.date).toLocaleDateString("en-gb")}
                </td>
                <td>
                  <button onClick={() => handleCancel(bookedClass._id)}>
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookedClasses;
