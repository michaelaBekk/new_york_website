import React, {Component} from 'react';
import './attractions.css';
import $ from 'jquery';


class Attractions extends Component {
    constructor() {
        super();
        this.toggleMenu = this.toggleMenu.bind(this);
        this.toggleExplore = this.toggleExplore.bind(this);
        this.selectImage = this.selectImage.bind(this);
    }

      // Toggle Navigation Menu ---------
    toggleMenu() {
        $('.attractions-sidebar').toggleClass('navbar--open');
        $('.attractions-reg-background').toggleClass('darken-background');
    }

    // Toggle Explore -------------
    toggleExplore() {
        $('.attractions-explore-options-container').toggleClass('show');
    }

    // Select an image to learn more about the attraction destination
    selectImage(e) {
        const xSmallMQ = window.matchMedia("(max-width:580px)");
        const smallMQ = window.matchMedia("(min-width:581px) and (max-width:750px)");
        const largeMQ = window.matchMedia("(min-width:851px) and (max-width:1163px)");
    

        // // Website --------
        $(e.target).toggleClass('image-clicked');
        $(e.target).siblings().toggleClass('show');

        // Mobile ----------
        switch(true) {
            case xSmallMQ.matches:
                $(e.target).toggleClass('xSmallImage');
            break;
            case smallMQ.matches:
                $(e.target).toggleClass('smallImage');
            break;
            case largeMQ.matches:
                $(e.target).toggleClass('largeImage');
            break;
            default:
                $(e.target).toggleClass('largestScreen'); 
        }
    }

    componentDidMount() {
        const title = document.querySelector('title');
        title.innerHTML = 'New York - Attractions';
    }

    render() {
        document.body.style.background = "#ffd699";
        return (
            <div>
                <div className="attractions-reg-background"></div>
                <div className="page-name">
                    <h1 className="attractions-title">Attractions</h1>
                    <span className="click-image">Click Image</span>
                    <i className="material-icons camera-icon">local_see</i>
                </div>
                <div id="imageCollection">
                    <div className="container attractions-container">
                        <img className="image1" id="image" src= "../Attraction_Images/statue-of-liberty.jpg" onClick={this.selectImage} alt="statue of liberty" />
                        <h2 className="liberty-heading h">Statue Of Liberty</h2>
                        <p className="statue-of-liberty p">The Statue of Liberty is more than a monument. She is a beloved friend, a living symbol of freedom to millions around the world. The museum exhibits are a tribute to the people who created her, to those who built and paid for her, to the ideals she represents, and to the hopes she inspires. </p>
                    </div>
                    <div className="container attractions-container">
                        <img className="image2" id="image" src= "../Attraction_Images/central-park.jpg" onClick={this.selectImage} alt="central park" />
                        <h2 className="central-park-heading h">Central Park</h2>
                        <p className="central-park p">The park's main attractions include landscapes such as the Ramble and Lake, Hallett Nature Sanctuary, the Jacqueline Kennedy Onassis Reservoir, and Sheep Meadow; amusement attractions such as Wollman Rink, Central Park Carousel, and the Central Park Zoo. The park also contains sports facilities including the North Meadow Recreation Center, basketball courts, and baseball and soccer fields.</p>
                    </div>
                    <div className="container attractions-container">
                        <img className="image3" id="image" src= "../Attraction_Images/empire-state.jpg" onClick={this.selectImage} alt="empire state building" />
                        <h2 className="empire-state-heading h">Empire State Building</h2>
                        <p className="empire-state-building p">The building's Art Deco architecture, height, and observation decks have made it a popular attraction. Around 4 million tourists from around the world annually visit the building's 86th and 102nd floor observatories; an additional indoor observatory on the 80th floor opened in 2019.</p>
                    </div>
                    <div className="container attractions-container">
                        <img className="image4" id="image" src="../Attraction_Images/carnegie-hall.jpg" onClick={this.selectImage} alt= "the perfomance room of carnegie hall" />
                        <h2 className="carnegie-hall-heading h">Carnegie Hall</h2>
                        <p className="carnegie-hall p">Designed by architect William Burnet Tuthill and built by philanthropist Andrew Carnegie in 1891, it is one of the most prestigious venues in the world for both classical music and popular music. Carnegie Hall has its own artistic programming, development, and marketing departments, and presents about 250 performances each season.</p>
                    </div>
                    <div className="container attractions-container">
                        <img className="image5" id="image" src= "../Attraction_Images/time-square.jpg" onClick={this.selectImage} alt="times square" />
                        <h2 className="times-square-heading h">Times Square</h2>
                        <p className="times-square p">Times Square is a major commercial intersection, tourist destination, entertainment center, and neighborhood in the Midtown Manhattan section of New York City, at the junction of Broadway and Seventh Avenue. Brightly lit by numerous billboards and advertisements, it stretches from West 42nd to West 47th Streets.</p>
                    </div>
                    <div className="container attractions-container">
                        <img className="image6" id="image" src= "../Attraction_Images/brooklyn-bridge.jpg" onClick={this.selectImage} alt="brooklyn bridge at night" />
                        <h2 className="bridge-heading h">Brooklyn Bridge</h2>
                        <p className="bridge p">The Brooklyn Bridge is the southernmost of four toll-free vehicular bridges connecting Manhattan Island and Long Island, with the Manhattan, Williamsburg, and Queensboro bridges to the north. Only passenger vehicles and pedestrian and bicycle traffic are permitted. A major tourist attraction since its opening, the Brooklyn Bridge has become an icon of New York City.</p>
                    </div>
                    <div className="container attractions-container">
                        <img className="image7" id="image" src= "../Attraction_Images/broadway-theatre.jpg" onClick={this.selectImage} alt="a ballet performance at the broadway theatre" />
                        <h2 className="broadway-heading h">Broadway Theatre</h2>
                        <p className="broadway p">Broadway theatre, also known simply as Broadway, refers to the theatrical performances presented in the 41 professional theatres, each with 500 or more seats, located in the Theater District and Lincoln Center along Broadway, in Midtown Manhattan, New York City.</p>
                    </div>
                </div>
                <div>
                    <i className= "material-icons attractions-open-bar" onClick={this.toggleMenu}>reorder</i>
                </div>
                <div className="attractions-sidebar">
                    <div className="d-flex flex-column attractions-menu-options-container">
                        <a className="attractions-menu-options" href="/"><i className="material-icons attractions-menu-icon">home</i>Home</a>
                        <a className="attractions-menu-options" onClick={this.toggleExplore}><i style={{marginLeft: 18 + 'px'}} className="material-icons attractions-menu-icon">explore</i>Explore</a>
                        <div className="attractions-explore-options-container">
                            <div className="attractions-explore-options">
                                <a href="/attractions"><i className="material-icons dropdown-arrow1">arrow_right</i>Attractions</a>
                                <a href="/restaurants"><i className="material-icons dropdown-arrow2">arrow_right</i>Restaurants</a>
                            </div>
                        </div>
                        <a className="attractions-menu-options" href="/hotels"><i className="material-icons attractions-menu-icon">hotel</i>Hotel</a>
                    </div>
                </div>    
            </div>
        )
    }
}

export default Attractions;