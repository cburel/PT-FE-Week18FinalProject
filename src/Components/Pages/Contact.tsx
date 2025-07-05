import React, { useState } from 'react'
import ContactForm from '../ContactForm'

// contact page component - renders the contact page
export default function Contact() {
    return (
        <>
            <div>
                <h1 className="header-display">Contact</h1>
                <ContactForm />
            </div>
        </>
    )
}