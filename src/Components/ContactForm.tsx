import { useEffect, useState } from "react";

interface Contact {
    id: number;
    name: string;
}

export default function ContactForm() {

    const [contacts, setContacts] = useState<Contact[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchContacts = async () => {
        setIsLoading(true);
        setError(null);

        // fetch the data
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

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const createContact = (contactName: string, contactEmail: string, contactPhone: string) => {
        createContactBackend(contactName, contactEmail, contactPhone);
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
                <div>

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