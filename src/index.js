import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
// Contact List Components
import ContactList from "./views/contacts/contact-list";
import AddContact from "./views/contacts/add-contact";
import UpdateContact from "./views/contacts/update-contact";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ContactList />} />
          <Route path="add-contact" element={<AddContact />} />
          <Route path=":contactId" element={<UpdateContact />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  </React.StrictMode>
);
