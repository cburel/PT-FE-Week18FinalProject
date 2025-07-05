// homepage component - renders the homepage content
export default function Homepage() {
    return (
        <>
            <div className='homepage-container'>
                <h1 className='header-display'>Hello!</h1>
                <div className="flex-wrapper">
                    <p>
                        My name is Celeste Burel. I'm a graduate of the University of Colorado Colorado Springs, having earned my degree in Game Design & Development. Originally from New Mexico, I moved to Colorado to pursue my studies and have created several games and proof of concepts during my time at UCCS. I am passionate about games and their ability to make positive impacts on people around the world. As I enter the workforce, I aim to inspire my audience to do good in the world.
                        <br /><br />
                        In my free time, I enjoy gaming (of course!), creative writing, and creating digital art.
                    </p>
                    <div className="portrait">
                        <img src="https://static.wixstatic.com/media/e1f63d_0ccababf7849416c8b0a4913717a2c80~mv2.jpg" />
                    </div>
                </div>
            </div>
        </>
    )
}