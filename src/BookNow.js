import React, { useState } from "react";

const BookNow = () => {
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add the functionality to handle the form submission
    setSubmitted(true);
  };

  if (submitted) {
    return <h2>Thank you for booking with us! We'll get in touch soon.</h2>;
  }

  return (
    <div className="book-now-container">
      <h1>Book Your Event</h1>
      <form onSubmit={handleSubmit} className="book-now-form">
        <div className="form-group">
          <label htmlFor="eventType">Select Event Type:</label>
          <select
            id="eventType"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            required
          >
            <option value="">-- Select an Event Type --</option>
            <option value="wedding">Wedding</option>
            <option value="birthday">Birthday</option>
            <option value="corporate">Corporate Event</option>
            <option value="others">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="eventDate">Event Date:</label>
          <input
            type="date"
            id="eventDate"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="guestCount">Number of Guests:</label>
          <input
            type="number"
            id="guestCount"
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value)}
            required
            min="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="additionalDetails">Additional Details:</label>
          <textarea
            id="additionalDetails"
            value={additionalDetails}
            onChange={(e) => setAdditionalDetails(e.target.value)}
            placeholder="Any special requests or details"
          />
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BookNow;
