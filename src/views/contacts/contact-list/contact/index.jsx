import React, { useState, useEffect } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronDown,
  faPenToSquare,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import DeleteContactDialog from "./delete-contact";
import avatar from "../../../../assets/1.jpg";
import avatar2 from "../../../../assets/2.jpg";
import avatar3 from "../../../../assets/3.jpg";

const Contact = ({ id, firstName, lastName, email, phone }) => {
  const history = useNavigate();
  // Collapsable Menu Content State
  const [isCollapsed, setIsCollapsed] = useState(true);
  // Delete Contact Dialog State
  const [isOpen, setIsOpen] = useState(false);

  // Set Avatar State
  const [contactAvatar, setContactAvatar] = useState(null);
  // Generate Random Avatar
  const images = [avatar, avatar2, avatar3];
  var randomAvatar = images[Math.floor(Math.random() * images.length)];
  // Set Avatar only on initial render
  useEffect(() => {
    setContactAvatar(randomAvatar);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <article className="card" key={id}>
        <div className="avatar-container">
          <img
            className="avatar"
            src={contactAvatar}
            alt={`${firstName} ${lastName} avatar`}
          />
        </div>
        <div className="content">
          <header className="header-content">
            {email ? (
              <button
                type="button"
                aria-label="Expand Contact Content"
                aria-controls={`expand-widget-${id}`}
                className="collapse-button"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {isCollapsed ? (
                  <FontAwesomeIcon icon={faChevronRight} />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} />
                )}
              </button>
            ) : (
              ""
            )}
            <h1>
              {firstName} {lastName}
            </h1>
          </header>
          <div className="details-actions">
            <div className="contact-details">
              <p>
                <b>Phone: </b> {phone ? phone : "No Phone Number"}
              </p>
              <div
                id={`expand-widget-${id}`}
                aria-expanded={isCollapsed}
                className={`collapse-content ${
                  isCollapsed ? "collapsed" : "expanded"
                }`}
              >
                <p>
                  <b>Email: </b> {email ? email : "No Email"}
                </p>
              </div>
            </div>
            <div className="actions">
              <Link
                to={`/${id}`}
                role="button"
                className="edit-icon"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    history(`/${id}`);
                  }
                }}
                aria-label={`Edit Contact ${firstName} ${lastName}`}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </Link>
              <button
                className="delete-btn"
                type="button"
                aria-label={`Delete Contact ${firstName} ${lastName}`}
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
        </div>
      </article>
      {isOpen && (
        <DeleteContactDialog
          className="dialog-container"
          setIsOpen={setIsOpen}
          id={id}
          firstName={firstName}
          lastName={lastName}
        />
      )}
    </>
  );
};

export default Contact;
