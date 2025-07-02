import { useEffect, useState } from "react";

interface Contact {
    id: number;
    name: string;
}

export default function ContactForm() {

    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        const fetchContacts = async () => {

            // fetch the data
            try {
                const response = await fetch("https://685ede747b57aebd2afad59f.mockapi.io/api/site/contact");
                if (!response.ok) {
                    throw new Error("Failed to fetch!");
                }
                const data: Contact[] = await response.json();
                setContacts(data);
            } catch (e) {
                console.error("Error fetching contacts:", e);
            };
            fetchContacts();
        }
    }, []);

    function revealContacts() {
        return (
            contacts.map((contact) => (
                <p key={contact.id}>Name: {contact.name}</p>
            ))
        )
    }

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const createContact = (contactName: string, contactEmail: string, contactPhone: string) => {
        createContactBackend(contactName, contactEmail, contactPhone);

        const newContact = {
            name: contactName,
            email: contactEmail,
            phone: contactPhone,
            id: contacts.length + 1
        }
        setContacts([...contacts, newContact]);
    }

    const createContactBackend = async (contactName: string, contactEmail: string, contactPhone: string) => {
        try {
            const response = await fetch(`https://685ede747b57aebd2afad59f.mockapi.io/api/site/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: contactName, email: contactEmail, phone: contactPhone }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Failed to add contact on backend: ${response.status} - ${error.message || 'Unknown error'}`);
            }
            const addedContact = await response.json();
            console.log("Added contact on backend", addedContact);
        } catch (e) {
            console.error("Error adding contact on backend ", e);
        }
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Your Name"
                onChange={(event => setName(event.target.value))}

            />
            <input
                type="text"
                placeholder="Your Email"
                onChange={(event => setEmail(event.target.value))}

            />
            <input
                type="text"
                placeholder="Your Phone Number"
                onChange={(event => setPhone(event.target.value))}
            />
            <button
                type="button"
                onClick={() => createContact(name, email, phone)}
            >
                Submit
            </button>
            <div>
                <button
                    type="button"
                    onClick={revealContacts}
                >
                    Reveal Contacts
                </button>
            </div>
        </div>
    )
}