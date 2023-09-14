const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contactById = await getContactById(id);
      console.log(contactById);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removedContact = await removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

// listContacts();
// getContactById('C9sjBfCo4UJCWjzBnOtxl');
// removeContact("ptykFpzJMvxKgQqiRiD3c");
// addContact("Alec Howard", "Donec.elementum@scelerisquescelerisquedui.net", "(748) 206-2688");

// {
//   "id": "rsKkOQUi80UsgVPCcLZZW",
//   "name": "Alec Howard",
//   "email": "Donec.elementum@scelerisquescelerisquedui.net",
//   "phone": "(748) 206-2688"
// }
