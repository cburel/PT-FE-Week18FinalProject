import { useEffect, useState } from "react";

// contact obj
interface Contact {
    id: number;
    name: string;
}

// contact form component - handles the contact form
export default function ContactForm() {

    // tracks contacts, loading, and error states
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // fetches the current contact list from the api
    const fetchContacts = async () => {
        setIsLoading(true);
        setError(null);

        // fetch the data. if there is an error, report it
        try {
            const response = await fetch("https://685ede747b57aebd2afad59f.mockapi.io/api/site/contact");
            if (!response.ok) {
                throw new Error(`Failed to fetch contacts: ${response.statusText}`);
            }
            const data: Contact[] = await response.json();
            setContacts(data);
        } catch (e: any) {
            setError(`Failed to load contacts: ${e.message || 'Unknown error'}`);
        } finally {
            setIsLoading(false);
        };
    }

    // tracks contact info
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    // checks new contact values. if any field is left blank, does not create the contact
    const createContact = (contactName: string, contactEmail: string, contactPhone: string) => {
        if (contactName.trim().length !== 0 &&
            contactEmail.trim().length !== 0 &&
            contactPhone.trim().length !== 0) {
            createContactBackend(contactName, contactEmail, contactPhone);
        }
        else {
            console.error("Name, email, and phone values cannot be empty!");
        }
    }

    // adds the new contact
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

    // renders the form and contacts
    return (
        <div>
            <div className="input-btn-display">
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
                    Create Contact
                </button>
                <button
                    type="button"
                    onClick={fetchContacts}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Reveal Contact Names'}
                </button>
            </div>
            {isLoading && (
                <p>
                    Fetching contacts...
                </p>
            )}
            {error && (
                <div>
                    <strong>Error!</strong>
                    <span >{error}</span>
                </div>
            )}
            {!isLoading && contacts.length > 0 && (
                <div className="contacts-list">
                    <ul>
                        {contacts.map((contact) => (
                            <li
                                key={contact.id}
                            >
                                <p>
                                    <span>Name:</span> {contact.name}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}