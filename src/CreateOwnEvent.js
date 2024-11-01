import React, { useState } from "react";
import "./App.css"; // Import the CSS file
import ImageModal from "./ImageModal"; // Import the ImageModal component

// Sample images for venues and invitations
import venue1 from "./images/venue1.jpg";
import venue2 from "./images/venue2.jpg";
import venue3 from "./images/venue3.jpg";
import venue4 from "./images/venue4.jpg";
import venue5 from "./images/venue5.jpg";
import invitation1 from "./images/invitation1.jpg";
import invitation2 from "./images/invitation2.jpg";
import invitation3 from "./images/invitation3.jpg";
import invitation4 from "./images/invitation4.jpg";
import invitation5 from "./images/invitation5.jpg";

const CreateOwnEvent = () => {
  const [eventChecklist, setEventChecklist] = useState({
    venue: false,
    catering: false,
    decorations: false,
    invitations: false,
    entertainment: false,
    photography: false,
    security: false,
    soundSystem: false,
    lighting: false,
    seating: false,
    transportation: false,
    gifts: false,
    eventPlanner: false,
    staffManagement: false,
    accommodation: false,
    phone: "",
    email: "",
    eventLocation: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentOption, setCurrentOption] = useState("");

  const handleChecklistChange = (e) => {
    const { name, type, checked, value } = e.target;
    setEventChecklist({
      ...eventChecklist,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event created with the following checklist:", eventChecklist);
  };

  const openImageModal = (type) => {
    if (type === "venue") {
      setModalImages([
        { src: venue1 },
        { src: venue2 },
        { src: venue3 },
        { src: venue4 },
        { src: venue5 },
      ]);
    } else if (type === "invitations") {
      setModalImages([
        { src: invitation1 },
        { src: invitation2 },
        { src: invitation3 },
        { src: invitation4 },
        { src: invitation5 },
      ]);
    }
    setCurrentOption(type);
    setIsModalOpen(true);
  };

  const handleImageSelect = (src) => {
    setSelectedImage(src);
    setEventChecklist((prev) => ({
      ...prev,
      [currentOption]: src,
    }));
  };

  const handleModalSubmit = () => {
    setIsModalOpen(false);
    setSelectedImage(null); // Reset selected image when modal closes
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="event-checklist-container">
      <h1>Create Your Own Event</h1>
      <form onSubmit={handleSubmit}>
        {/* Event Name */}
        <div className="form-group">
          <label htmlFor="eventName">Name:</label>
          <input
            type="text"
            name="eventName"
            required
            onChange={handleChecklistChange}
          />
        </div>

        {/* Phone */}
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={eventChecklist.phone}
            onChange={handleChecklistChange}
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={eventChecklist.email}
            onChange={handleChecklistChange}
            required
          />
        </div>

        {/* Event Location */}
        <div className="form-group">
          <label htmlFor="eventLocation">Event Location:</label>
          <input
            type="text"
            name="eventLocation"
            value={eventChecklist.eventLocation}
            onChange={handleChecklistChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventName">Event-type</label>
          <input
            type="text"
            name="Event-type"
            required
            onChange={handleChecklistChange}
          />
        </div>

        {/* Event Checklist */}
        <h2>Event Checklist</h2>
        <div className="checklist">
          {/* Venue */}
          <div className="checklist-item">
            <label>
              <input
                type="checkbox"
                name="venue"
                checked={!!eventChecklist.venue}
                onChange={handleChecklistChange}
                onClick={() => openImageModal("venue")}
              />
              Venue Booking
            </label>
          </div>

          {/* Invitations */}
          <div className="checklist-item">
            <label>
              <input
                type="checkbox"
                name="invitations"
                checked={!!eventChecklist.invitations}
                onChange={handleChecklistChange}
                onClick={() => openImageModal("invitations")}
              />
              Invitations
            </label>
          </div>

          {/* Additional Checklist Items */}
          <div className="checklist-item">
            <label>
              <input
                type="checkbox"
                name="catering"
                checked={eventChecklist.catering}
                onChange={handleChecklistChange}
              />
              Catering Service
            </label>
          </div>
          <div className="checklist-item">
            <label>
              <input
                type="checkbox"
                name="decorations"
                checked={eventChecklist.decorations}
                onChange={handleChecklistChange}
              />
              Decorations
            </label>
          </div>
          <div className="checklist-item">
            <label>
              <input
                type="checkbox"
                name="entertainment"
                checked={eventChecklist.entertainment}
                onChange={handleChecklistChange}
              />
              Entertainment
            </label>
          </div>
          <div className="checklist-item">
            <label>
              <input
                type="checkbox"
                name="photography"
                checked={eventChecklist.photography}
                onChange={handleChecklistChange}
              />
              Photography
            </label>
          </div>
          <div className="checklist-item">
            <label>
              <input
                type="checkbox"
                name="security"
                checked={eventChecklist.security}
                onChange={handleChecklistChange}
              />
              Security
            </label>
          </div>
          <div className="checklist-item">
            <label>
              <input
                type="checkbox"
                name="soundSystem"
                checked={eventChecklist.soundSystem}
                onChange={handleChecklistChange}
              />
              Sound System
            </label>
          </div>
          <div className="checklist-item">
            <label>
              <input
                type="checkbox"
                name="lighting"
                checked={eventChecklist.lighting}
                onChange={handleChecklistChange}
              />
              Lighting
            </label>
          </div>
          <div className="checklist-item">
            <label>
              <input
                type="checkbox"
                name="seating"
                checked={eventChecklist.seating}
                onChange={handleChecklistChange}
              />
              Seating Arrangements
            </label>
          </div>
          <div className="checklist-item">
            <label>
              <input
                type="checkbox"
                name="transportation"
                checked={eventChecklist.transportation}
                onChange={handleChecklistChange}
              />
              Transportation
            </label>
          </div>
          <div className="checklist-item">
            <label>
              <input
                type="checkbox"
                name="gifts"
                checked={eventChecklist.gifts}
                onChange={handleChecklistChange}
              />
              Return Gifts
            </label>
          </div>
          <div className="checklist-item">
            <label>
              <input
                type="checkbox"
                name="eventPlanner"
                checked={eventChecklist.eventPlanner}
                onChange={handleChecklistChange}
              />
              Event Planner Services
            </label>
          </div>
          <div className="checklist-item">
            <label>
              <input
                type="checkbox"
                name="staffManagement"
                checked={eventChecklist.staffManagement}
                onChange={handleChecklistChange}
              />
              Staff Management
            </label>
          </div>
          <div className="checklist-item">
            <label>
              <input
                type="checkbox"
                name="accommodation"
                checked={eventChecklist.accommodation}
                onChange={handleChecklistChange}
              />
              Accommodation Arrangements
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Create Event
        </button>
      </form>

      {/* Render Modal */}
      {isModalOpen && (
        <ImageModal
          images={modalImages}
          onClose={closeModal}
          onSelect={handleImageSelect}
          selectedImage={selectedImage}
          onSubmit={handleModalSubmit} // Pass the correct onSubmit handler
        />
      )}
    </div>
  );
};

export default CreateOwnEvent;
