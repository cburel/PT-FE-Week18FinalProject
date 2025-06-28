import React, { use, useState, useEffect } from 'react'

interface Image {
    id: number;
    name: string;
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

    // handles deleting an image
    const deleteImage = (idToDelete: number) => {

        // creates new array of items with everything except the item to delete
        setImages(prevImages =>
            prevImages.filter(image => image.id !== idToDelete));
    }

    // tracks updating the item name
    const [updatedName, setUpdatedName] = useState("");

    // handles updating an existing item in the list
    const updateImage = (idToUpdate: number, newName: string) => {
        setImages(prevImages =>
            prevImages.map(image =>
                image.id === idToUpdate ? { ...image, name: newName } : image
            )
        );
    };

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
            <div className="art-items">
                {images.map((image) => (
                    <div className="flex-unwrapper">
                        <div key={image.id} className="art-image"><img src={image.image} /></div>
                        <div>by {image.name}</div>
                        <div className="image-buttons">
                            <button type="button" className="btn btn-danger btn-del" onClick={() => deleteImage(image.id)}>X</button>
                            <button type="button" className="btn btn-primary btn-upd" onClick={() => updateImage(image.id, updatedName)}>U</button>
                            <input type="text" placeholder="update title" onChange={(event => setUpdatedName(event.target.value))}></input>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}