import React, { use, useState, useEffect } from 'react'

interface Image {
    id: number;
    image: string;
}

export default function ArtItem() {

    // holds fetched images
    const [images, setImages] = useState<Image[]>([]);
    // manages loading status
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchImages = async () => {

            // fetch the data
            try {
                setIsLoading(true); // sets the loading message while waiting
                const response = await fetch("https://685ede747b57aebd2afad59f.mockapi.io/api/site/art");
                if (!response.ok) {
                    throw new Error("Failed to fetch!");
                }
                const data: Image[] = await response.json();
                setImages(data);
            } catch (e) {
                console.error("Error fetching images:", e);
            } finally {
                setIsLoading(false); // removes loading message when done
            }
        };

        fetchImages();
    }, []);

    // renders loading message
    if (isLoading) {
        return (
            <p>Loading...</p>
        );
    }

    // renders empty array message
    if (images.length === 0) {
        return (
            <p>No art to load!</p>
        );
    }

    // renders out the items onto the page
    return (
        <div>
            <ul className="art-items">
                {images.map((item) => (
                    <li key={item.id} className="art-image"><img src={item.image} /></li>
                ))}
            </ul>
        </div>
    )
}