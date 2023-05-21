const fs = require("fs").promises;
const contactsPath = require('path').join(__dirname, "db", "contacts.json");
const {nanoid} = require("nanoid");


 async function listContacts() {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data);
 }

 async function getContactById(contactId) {
    const allContacts = await listContacts();
    const contact = allContacts.find(contact => contact.id === contactId);
    return contact || null;
 }

async function addContact(data) {
    const allContacts =  await listContacts();
    const newContact = {
       id: nanoid(),
       ...data,
    }
    
    allContacts.push(newContact); 
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact;
 }

async function removeContact(contactId) {
   const allContacts = await listContacts();
   const index = allContacts.findIndex(contact => contact.id === contactId);
   if (index === -1) {
      return null;
   }

   const [result] = allContacts.splice(index, 1);
   await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
   return result;
}


module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
}




