import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

import venue1 from "./images/Banquete.webp";
import venue2 from "./images/Outdoor.jpg";
import venue3 from "./images/Club.jpg";

const BirthdayPage = () => {
  return (
    <div className="birthday-page">
      <h1 className="page-header">Birthday Party Venues</h1>
      <div className="venue-images">
        <div className="venue-item">
          <img src={venue1} alt="Venue 1" className="venue-image" />
          <h2 className="venue--name">Banquet Hall</h2>
          <ul className="venue-details">
            <li> Includes food, drinks, and decor</li>
            <li> Includes food, drinks, decor, and entertainment</li>
            <li> Customized package based on your needs</li>
          </ul>
          {/* Link to the Book Now page */}
          <Link to="/book-now">
            <button className="birthday-button">Book Now</button>
          </Link>
        </div>
        <div className="venue-item">
          <img src={venue2} alt="Venue 2" className="venue-image" />
          <h2 className="venue-name">Outdoor Party</h2>
          <ul className="venue-details">
            <li> Includes food, drinks, and basic setup</li>
            <li> Includes food, drinks, decor, and entertainment</li>
            <li> Customized package based on your needs</li>
          </ul>
          {/* Link to the Book Now page */}
          <Link to="/book-now">
            <button className="birthday-button">Book Now</button>
          </Link>
        </div>
        <div className="venue-item">
          <img src={venue3} alt="Venue 3" className="venue-image" />
          <h2 className="venue--name">Club Party</h2>
          <ul className="venue-details">
            <li> Includes food, drinks, and DJ</li>
            <li> Includes food, drinks, DJ, and decorations</li>
            <li> Customized package based on your needs</li>
          </ul>
          {/* Link to the Book Now page */}
          <Link to="/book-now">
            <button className="birthday-button">Book Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BirthdayPage;
