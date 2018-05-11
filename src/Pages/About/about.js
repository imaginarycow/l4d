import React, {Component} from 'react';
import './about.css';


const App = () => {
    
    const aboutText = "Left4Dev is about finding your calling and wanting to help others get there too.";

    return (
        <div id="aboutDiv">
            <h3>About Left4Dev</h3>
            <p>{aboutText}</p>
        </div>
    )
        
    
}

export default App;