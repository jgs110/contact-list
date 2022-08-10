import React, { useState, useContext } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import { useNavigate, Link } from "react-router-dom";
import "./styles.css";

const AddContact = () => {
  let history = useNavigate();

  const { addContact, contacts } = useContext(GlobalContext);

  // Contact State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newContact = {
      id: contacts.length + 1,
      firstName,
      lastName,
      phone,
      email,
    };
    addContact(newContact);
    history("/");
  };

  return (
    <div className="add-container">
      <h2>Add New Contact</h2>
      <div>
        <form className="add-form" onSubmit={handleSubmit}>
          <label htmlFor="first">
            <b>First Name:</b>
          </label>
          <input
            id="first"
            type="text"
            name="first"
            placeholder="Enter First Name.."
            onChange={(e) => setFirstName(e.target.value)}
            aria-label="Enter First Name."
            required
          ></input>
          <label htmlFor="last">
            <b>Last Name:</b>
          </label>
          <input
            id="last"
            type="text"
            name="last"
            placeholder="Enter Last Name.."
            onChange={(e) => setLastName(e.target.value)}
            aria-label="Enter Last Name."
            required
          ></input>
          <label htmlFor="phone">
            <b>Phone:</b>
          </label>
          <small aria-describedby={"Phone Format: XXX-XXX-XXXX"}>
            Format: XXX-XXX-XXXX
          </small>
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="Enter Phone..."
            onChange={(e) => setPhone(e.target.value)}
            aria-label="Enter Phone Number."
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
          />
          <label htmlFor="email">
            <b>Email:</b>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter Email..."
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Enter Email."
          ></input>
          <div className="btn-group">
            <button
              type="button"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  history("/");
                }
              }}
            >
              <Link
                to="/"
                role="button"
                tabIndex="-1"
                aria-label={"Cancel Add New Contact"}
              >
                Cancel
              </Link>
            </button>
            <button type="submit" aria-label={"Confirm Add New Contact"}>
              Add Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
