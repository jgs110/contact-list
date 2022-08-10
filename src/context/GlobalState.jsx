import React, { createContext, useReducer } from "react";
import appReducer from "./AppReducer";

const initialState = {
  contacts: [
    {
      id: 1,
      firstName: "Jason",
      lastName: "Saldana",
      phone: "111-222-3333",
      email: "jason@gmail.com",
    },
    {
      id: 2,
      firstName: "Laura",
      lastName: "Huerta",
      phone: "111-222-3333",
      email: "laura@gmail.com",
    },
    {
      id: 3,
      firstName: "Jim",
      lastName: "Jones",
      phone: "111-222-3333",
      email: "jim@gmail.com",
    },
    {
      id: 4,
      firstName: "Mary",
      lastName: "Moore",
      phone: "111-222-3333",
      email: "moore@gmail.com",
    },
    {
      id: 5,
      firstName: "Michael",
      lastName: "Jordan",
      phone: "111-222-3333",
      email: "jordan@gmail.com",
    },
    {
      id: 6,
      firstName: "Steve",
      lastName: "Stevenson",
      phone: "111-222-3333",
      email: "steve@gmail.com",
    },
    {
      id: 7,
      firstName: "Andy",
      lastName: "Thompson",
      phone: "111-222-3333",
      email: "andy@gmail.com",
    },
    {
      id: 8,
      firstName: "Samurai",
      lastName: "Jack",
      phone: "111-222-3333",
      email: "jack@gmail.com",
    },
  ],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  function addContact(contact) {
    dispatch({
      type: "ADD_CONTACT",
      payload: contact,
    });
  }

  function editContact(contact) {
    dispatch({
      type: "EDIT_CONTACT",
      payload: contact,
    });
  }

  function removeContact(id) {
    dispatch({
      type: "REMOVE_CONTACT",
      payload: id,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
        editContact,
        removeContact,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
