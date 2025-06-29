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

    return (
        <div>
            <input
                type="text"
                placeholder="Your Name"
            />
            <input
                type="email"
                placeholder="Your Email"
            />
            <input
                type="phone"
                placeholder="Your Phone Number"
            />
            <button type="button">Submit</button>
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