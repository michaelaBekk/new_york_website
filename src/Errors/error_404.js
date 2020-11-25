import React, {Component} from 'react';

export default class Error404 extends Component {
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
            <div className="container mx-auto" style={{width: 550 + 'px', marginTop: 200 + 'px'}}>
                <h1 style={{fontFamily: 'Arial'}}><span style={{fontSize: 100 + 'px'}}>Error <strong>404:</strong></span><br />Page Not Found</h1>
                <p style={{fontFamily: "Times New Roman", fontSize: 20 + 'px'}}>Oops! It looks like the page you are trying to reach does not exist.</p>
                <a href="/" style={{fontFamily: "Times New Roman", fontSize: 25 + 'px', textDecoration: 'underline'}}>Return to Home</a>
            </div>
        )
    }
}