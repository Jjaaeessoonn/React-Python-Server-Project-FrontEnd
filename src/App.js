import logo from './logo.svg';
import './App.css';
import React from 'react'
import ContactList from './ContactList';
import ContactForm from './ContactForm';

function App() {

  const [contacts, setContacts] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentContact, setCurrentContact] = React.useState({});

  React.useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts")
    const data = await response.json()
    setContacts(data.contacts)
    // console.log(data.contacts)
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContact({});
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  }

  const openEditModal = (contact)=>{
    if (isModalOpen) return;
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchContacts()
  }

  return (
    <div className="App">
      <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate} />
      <button onClick={openCreateModal}>Create New Contact</button>
      {isModalOpen && <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
        </div>
      </div>
      }
      
    </div>
  );
}

export default App;
