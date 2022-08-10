import { useState, useContext, useEffect } from "react";
import "./styles.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import { GlobalContext } from "../../../context/GlobalState";

const UpdateContact = () => {
  let history = useNavigate();

  const { contacts, editContact } = useContext(GlobalContext);

  const [selectedContact, setSelectedContact] = useState({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // Get contact ID from route params.
  let { contactId } = useParams();

  useEffect(() => {
    const setContact = contacts.find((item) => item.id === parseInt(contactId));
    setSelectedContact(setContact);
  }, [contactId, contacts]);

  const onSubmit = (e) => {
    e.preventDefault();
    editContact(selectedContact);
    history("/");
  };

  const handleOnChange = (userKey, newValue) =>
    setSelectedContact({ ...selectedContact, [userKey]: newValue });

  if (!selectedContact || !selectedContact.id) {
    return <div>Invalid Contact ID.</div>;
  }

  return (
    <div className="update-container">
      <h2>{`Update ${selectedContact.firstName} ${selectedContact.lastName}`}</h2>
      <div>
        <form className="update-form" onSubmit={onSubmit}>
          <label htmlFor="first">
            <b>First Name:</b>
          </label>
          <input
            id="first"
            type="text"
            name="first"
            placeholder="Enter First Name.."
            value={selectedContact.firstName}
            onChange={(e) => handleOnChange("firstName", e.target.value)}
            aria-label="Update First Name."
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
            value={selectedContact.lastName}
            onChange={(e) => handleOnChange("lastName", e.target.value)}
            aria-label="Update Last Name."
            required
          ></input>
          <label htmlFor="phone">
            <b>Phone:</b>
          </label>
          <small>Format: XXX-XXX-XXXX</small>
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="Enter Phone..."
            value={selectedContact.phone}
            onChange={(e) => handleOnChange("phone", e.target.value)}
            aria-label="Update Phone Number."
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
          ></input>

          <label htmlFor="email">
            <b>Email:</b>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter Email..."
            value={selectedContact.email}
            onChange={(e) => handleOnChange("email", e.target.value)}
            aria-label="Update Email"
          ></input>
          <div className="btn-group">
            <button
              type="button"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  history("/");
                }
              }}
              aria-label={`Cancel Update Contact for ${selectedContact.firstName} ${selectedContact.lastName}`}
            >
              <Link to="/" role="button" tabIndex="-1">
                Cancel
              </Link>
            </button>
            <button
              type="submit"
              aria-label={`Confirm Update Contact ${selectedContact.firstName} ${selectedContact.lastName}`}
            >
              Update Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateContact;
