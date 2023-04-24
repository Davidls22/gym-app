import React, { useState } from "react";

const AddClassForm = ({ onAddClass }) => {
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [instructor, setInstructor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddClass({ day, time, name, instructor });
    setDay("");
    setTime("");
    setName("");
    setInstructor("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Class</h2>
      <div>
        <label htmlFor="day">Day of the Week:</label>
        <select id="day" value={day} onChange={(e) => setDay(e.target.value)}>
          <option value="">--Select a Day--</option>
          <option value="Sunday">Sunday</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
        </select>
      </div>
      <div>
        <label htmlFor="time">Time:</label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="name">Class Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="instructor">Instructor:</label>
        <input
          type="text"
          id="instructor"
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
        />
      </div>
      <button type="submit">Add Class</button>
    </form>
  );
};

export default AddClassForm;
