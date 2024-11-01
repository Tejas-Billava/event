import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

import venue1 from "./images/Conference.jpeg";
import venue2 from "./images/HotelMeet.jpg";
import venue3 from "./images/Community.jpg";

const CorporatePage = () => {
  return (
    <div className="corporate-page">
      <h1 className="page-header3">Corporate Venues</h1>
      <div className="corporate-images">
        <div className="corporate-item">
          <img src={venue1} alt="Venue 1" className="corporate-image" />
          <h2 className="corporate--name">Conference Room</h2>
          <ul className="corporate-details">
            <li> Includes food, drinks, and decor</li>
            <li> Includes food, drinks, decor, and entertainment</li>
            <li> Customized package based on your needs</li>
          </ul>
          {/* Link to the Book Now page */}
          <Link to="/book-now">
            <button className="corporate-button">Book Now</button>
          </Link>
        </div>
        <div className="corporate-item">
          <img src={venue2} alt="Venue 2" className="corporate-image" />
          <h2 className="corporate--name">Hotel Room</h2>
          <ul className="corporate-details">
            <li> Includes food, drinks, and basic setup</li>
            <li> Includes food, drinks, decor, and entertainment</li>
            <li> Customized package based on your needs</li>
          </ul>
          {/* Link to the Book Now page */}
          <Link to="/book-now">
            <button className="corporate-button">Book Now</button>
          </Link>
        </div>
        <div className="corporate-item">
          <img src={venue3} alt="Venue 3" className="corporate-image" />
          <h2 className="corporate--name">Community Centre</h2>
          <ul className="corporate-details">
            <li> Includes food, drinks, and DJ</li>
            <li> Includes food, drinks, DJ, and decorations</li>
            <li> Customized package based on your needs</li>
          </ul>
          {/* Link to the Book Now page */}
          <Link to="/book-now">
            <button className="corporate-button">Book Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CorporatePage;
