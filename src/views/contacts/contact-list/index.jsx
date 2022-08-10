import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import Contact from "./contact";
import logo from "../../../assets/visa-logo.png";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ContactList = () => {
  const { contacts } = useContext(GlobalContext);
  let history = useNavigate();

  const [loading, setLoading] = useState(false);

  // Fake loader to simulate loading state
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [contacts]);

  // Map through all contacts and sort in alphabetical order
  const content = contacts
    .sort((a, b) => a.firstName.localeCompare(b.firstName))
    .map((item) => {
      return contacts.length > 0 ? (
        <div key={item.id}>
          <Contact
            id={item.id}
            firstName={item.firstName}
            lastName={item.lastName}
            phone={item.phone}
            email={item.email}
          />
        </div>
      ) : (
        "No Contacts Found.."
      );
    });

  return (
    <>
      <div className="wrapper">
        <header>
          <img
            className="visa-logo"
            src={logo}
            tabIndex="-1"
            alt="visa logo"
          ></img>
        </header>
        <div className="list-container">
          {loading ? (
            <div className="loader-container">
              <div className="spinner"></div>
            </div>
          ) : (
            <>
              <h1 className="banner-title">CONTACTS</h1>
              <Link
                to="/add-contact"
                role="button"
                className="add-btn"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    history("add-contact");
                  }
                }}
                aria-label="Add New Contact"
              >
                Add New Contact{" "}
                <FontAwesomeIcon
                  className="chevron-right"
                  icon={faChevronRight}
                />
              </Link>
              <ul className="list">
                <li>{content}</li>
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ContactList;
