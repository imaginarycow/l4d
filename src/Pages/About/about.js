import React, {Component} from 'react';
import './about.css';


const App = () => {
    
    const aboutText = "Left4Dev is about finding your calling and wanting to help others get there too.";

    const aboutInfo = [
        <div className="gifDiv">
            <p>Because Enterprise dev feels like this...</p>
            <img src='https://media.giphy.com/media/ZKZiW6GSx8eSA/giphy.gif' />
        </div>,
        <div className="gifDiv">
            <p>And Indie dev feels like this</p>
        <img src='https://media.giphy.com/media/QHE5gWI0QjqF2/giphy.gif' />
    </div>
        
    ];

    return (
        <div id="aboutDiv">
<<<<<<< HEAD
            <h3>Why Left4Dev?</h3>
            <div id="aboutStory">{aboutInfo}</div>
=======
            <h3>About Left4Dev</h3>
            <p>{aboutText}</p>
>>>>>>> db334092c472b93003ec23165faf7404e5d81b79
        </div>
    )
        
    
}

export default App;