import React, {Component} from 'react';
import './about.css';


const App = () => {

    const aboutInfo = [

        <div className="gifDiv" key="item1">
            <p>Because Enterprise development feels like this...</p>
            <img src='https://media.giphy.com/media/w87yLYL7lwDWE/giphy.gif' />
        </div>,
        <div className="gifDiv" key="item2">
            <p>And <em>This</em> feels like this</p>
            <img src='https://media.giphy.com/media/HuVCpmfKheI2Q/giphy.gif' />
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