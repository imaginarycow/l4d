import React, {Component} from 'react';
import './about.css';


const App = () => {

    const aboutInfo = [
        <div className="gifDiv">
            <p>Because Enterprise development feels like this...</p>
            <img src='https://media.giphy.com/media/ZKZiW6GSx8eSA/giphy.gif' />
        </div>,
        <div className="gifDiv">
            <p>And <em>This</em> feels like this</p>
        <img src='https://media.giphy.com/media/QHE5gWI0QjqF2/giphy.gif' />
    </div>
        
    ];

    return (
        <div id="aboutDiv">
            <h3>Why Left4Dev?</h3>
            <div id="aboutStory">{aboutInfo}</div>
        </div>
    )
        
    
}

export default App;