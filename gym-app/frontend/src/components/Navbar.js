import React from "react";
import dumbbell from '../images/dumbbell.png'

function Navbar(props) {
  return (
    <nav>
      <ul>
        <li>
          <button onClick={() => props.onPageChange("classList")}>Class List</button>
        </li>
        <li>
          <button onClick={() => props.onPageChange("bookedClasses")}>Booked Classes</button>
        </li>
      </ul>
      <img className="navimage" src={dumbbell} alt="gym"></img>
    </nav>
  );
}

export default Navbar;
