import React, { useContext, useEffect, useRef } from "react";
import "./styles.css";
import { GlobalContext } from "../../../../../context/GlobalState";

const DeleteContactDialog = ({ setIsOpen, id, firstName, lastName }) => {
  const { removeContact } = useContext(GlobalContext);

  // Reference specific selector
  const dialog = useRef(null);

  // Allow user to close modal on "Escape Press" for accessbility
  useEffect(() => {
    // Reference active selector
    const dialogContainer = dialog.current;
    // Add focusable selector string
    let focusableElementsString = "button";
    let focusableElements = dialogContainer.querySelectorAll(
      focusableElementsString
    );
    focusableElements = [...focusableElements];
    // Set focusable buttons
    let firstTabStop = focusableElements[0];
    let lastTabStop = focusableElements[focusableElements.length - 1];

    const keyListener = (e) => {
      // Check for "tab" key press
      if (e.key === "Tab") {
        // Shift+Tab
        if (e.shiftKey) {
          if (document.activeElement === firstTabStop) {
            e.preventDefault();
            lastTabStop.focus();
          }
        }
        // Tab
        else {
          if (document.activeElement === lastTabStop) {
            e.preventDefault();
            firstTabStop.focus();
          }
        }
      }
      // Esc to close dialog
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", keyListener);
    return () => document.removeEventListener("keydown", keyListener);
  });

  const handleClose = (e) => {
    e.preventDefault();
    removeContact(id);
    setIsOpen(false);
  };

  return (
    <div
      className="dialog-container"
      ref={dialog}
      role="dialog"
      aria-modal={setIsOpen(true)}
      aria-label="Delete Contact"
    >
      <div className="dialog-content">
        <form method="dialog">
          <h1>Delete Contact</h1>
          <p>{`Are you sure you want to delete "${firstName} ${lastName}"?`}</p>
          <div className="btn-group">
            <button
              type="button"
              value="Cancel"
              onClick={() => setIsOpen(false)}
              autoFocus
              aria-label={`Cancel Delete Contact for ${firstName} ${lastName}`}
              aria-keyshortcuts="Escape"
            >
              Cancel
            </button>
            <button
              type="button"
              id="confirmBtn"
              value="default"
              onClick={handleClose}
              aria-label={`Confirm Delete Contact ${firstName} ${lastName}`}
            >
              Delete Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteContactDialog;
