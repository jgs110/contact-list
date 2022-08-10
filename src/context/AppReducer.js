const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };

    case "EDIT_CONTACT":
      const updatedContact = action.payload;

      const updatedContacts = state.contacts.map((contact) => {
        if (contact.id === updatedContact.id) {
          return updatedContact;
        }
        return contact;
      });

      return {
        ...state,
        contacts: updatedContacts,
      };

    case "REMOVE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default AppReducer;
