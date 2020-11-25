import React, {Component} from 'react';

export default class ServerError extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        const title = document.querySelector('title');
        title.innerHTML = 'New York - Error';
    }

    render() {
        document.body.style.background = "white";
        return (
            <div className="container mx-auto" style={{width: 500 + 'px', marginTop: 200 + 'px'}}>
                <h1 style={{fontFamily: 'Arial'}}><span style={{fontSize: 100 + 'px'}}>Error <strong>500:</strong></span><br />Internal Server Error</h1>
                <p style={{fontFamily: "Times New Roman", fontSize: 25 + 'px'}}>Server failed to load. Try again!</p>
                <p style={{fontFamily: "Times New Roman", fontSize: 20 + 'px'}}>If problem continues to persist, please contact the site owner.</p>
                <a href="/" style={{fontFamily: "Times New Roman", fontSize: 25 + 'px', textDecoration: 'underline'}}>Return to Home</a>
            </div>
        )
    }
}