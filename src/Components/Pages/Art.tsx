import React, { useState } from 'react'
import ArtItem from '../ArtItem'

// art page component - renders the art page
export default function Art() {
    return (
        <>
            <div>
                <h1 className='header-display'>Gallery</h1>
                <div className='art-wrapper'>
                    <ArtItem />
                </div>
            </div>
        </>
    )
}