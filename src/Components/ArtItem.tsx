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

        deleteBackend(idToDelete);

        // creates new array of items with everything except the item to delete
        setImages(prevImages =>
            prevImages.filter(image => image.id !== idToDelete));
    }

    const deleteBackend = async (idToDelete: number) => {
        try {
            const response = await fetch(`https://685ede747b57aebd2afad59f.mockapi.io/api/site/art/${idToDelete}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Failed to delete image on backend: ${response.status} - ${error.message || 'Unknown error'}`);
            }
        }
        catch (e) {
            console.error("Error updating name on backend: ", e)
        }
    }

    // tracks updating the item name
    const [updatedName, setUpdatedName] = useState("");

    // handles updating an existing item in the list
    const updateImageName = async (idToUpdate: number, newName: string) => {

        if (newName.trim().length === 0) {
            console.error("Author name cannot be empty!");
            return;
        }

        updateNameBackend(idToUpdate, newName);

        setImages(prevImages =>
            prevImages.map(image =>
                image.id === idToUpdate ? { ...image, name: newName } : image
            )
        );
    };

    const updateNameBackend = async (idToUpdate: number, newName: string) => {
        try {
            const response = await fetch(`https://685ede747b57aebd2afad59f.mockapi.io/api/site/art/${idToUpdate}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newName }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Failed to update name on backend: ${response.status} - ${error.message || 'Unknown error'}`);
            }

            const updatedItem = await response.json();
            console.log("Updated name on backend: ", updatedItem);
        } catch (e) {
            console.error("Error updating name on backend: ", e)
        }
    };

    const [newName, setNewName] = useState("");
    const [url, setUrl] = useState("");

    // handles updating an existing item in the list
    const createImage = async (newName: string, url: string) => {

        if (newName.trim().length === 0 || url.trim().length === 0) {
            console.error("Author name and image URL cannot be empty!");
            return
        }

        createItemBackend(newName, url);

        const newImage = { id: images.length + 1, name: newName, image: url };
        setImages([...images, newImage]);
    };

    const createItemBackend = async (newName: string, url: string) => {
        try {
            const response = await fetch(`https://685ede747b57aebd2afad59f.mockapi.io/api/site/art`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newName, image: url }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Failed to add image on backend: ${response.status} - ${error.message || 'Unknown error'}`);
            }

            const updatedItem = await response.json();
            console.log("Added image on backend: ", updatedItem);
        } catch (e) {
            console.error("Error adding image on backend: ", e)
        }
    }

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
        <>
            <div className="art-items">
                {images.map((image) => (
                    <div key={image.id} className="flex-unwrapper">
                        <div
                            className="art-image"
                        >
                            <img src={image.image} />
                        </div>
                        <div className='author-name'>by {image.name}</div>
                        <div className="image-buttons">
                            <button
                                type="button"
                                className="btn btn-danger btn-del"
                                onClick={() => deleteImage(image.id)}
                            >
                                X
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary btn-upd"
                                onClick={() => updateImageName(image.id, updatedName)}
                            >
                                U
                            </button>
                            <input
                                type="text"
                                placeholder="update name"
                                onChange={(event => setUpdatedName(event.target.value))}>
                            </input>
                        </div>
                    </div>
                ))}
            </div>
            <div className='create-image'>
                <div className="create-wrapper">
                    <button
                        type="button"
                        className='btn btn-success btn-create'
                        onClick={() => createImage(newName, url)}
                    >
                        Create Image
                    </button>
                    <input
                        type="text"
                        placeholder="author name"
                        onChange={(event => setNewName(event.target.value))}>
                    </input>
                    <input
                        type="text"
                        placeholder="full image url"
                        onChange={(event => setUrl(event.target.value))}>
                    </input>
                </div>
            </div>
        </>
    )
}