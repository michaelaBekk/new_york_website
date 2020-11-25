import React, {Component} from 'react';
import './home.css';
import $ from 'jquery';


class HomePage extends Component {
    constructor() {
        super();
        this.toggleMenu = this.toggleMenu.bind(this);
        this.toggleExplore = this.toggleExplore.bind(this);
        this.imageSlideShowNext = this.imageSlideShowNext.bind(this);
        this.imageSlideShowPrev = this.imageSlideShowPrev.bind(this);
        this.state = {
            counter: 0
        }
    }

    componentDidMount() {
        const title = document.querySelector('title');
        title.innerHTML = 'New York - Home';
    }

    // Toggle Navigation Menu ---------
   toggleMenu() {
        $('.home-sidebar').toggleClass('navbar--open');
        $('.home-reg-background').toggleClass('darken-background');
    }

    // Toggle Explore -------------
    toggleExplore() {
        $('.home-explore-options-container').toggleClass('show');
    }

    // Previous Image ---------
    imageSlideShowPrev() {
        const size = $('.img-home').innerWidth();

        if (this.state.counter <= 0) return;

        this.state.counter --
        $('.home-image-slides').css('transform', 'translateX(' + (-size * this.state.counter) + 'px)');
          
        if(this.state.counter === 0){
            $('#prevBtn').hide();
        }

        if(this.state.counter > 0 && this.state.counter < 5) {
            $('#prevBtn').show();
            $('#nextBtn').show();
        }
      
    }

    // Next Image -----------
    imageSlideShowNext() {
        const size = $('.img-home').innerWidth();

        if (this.state.counter >= $('.img-home').length - 1) return;

        this.state.counter ++
         $('.home-image-slides').css('transform', 'translateX(' + (-size * this.state.counter) + 'px)');

        if(this.state.counter === 5) {
            $('#nextBtn').hide();
        }

        if(this.state.counter > 0 && this.state.counter < 5) {
            $('#prevBtn').show();
            $('#nextBtn').show();
        }
    }

    render() {
        return (
            <div id="homePage">
                <div className="home-reg-background"></div>
                <i className="material-icons home-open-bar" onClick={this.toggleMenu}>reorder</i>
                <div className="home-sidebar">
                    <div className="d-flex flex-column home-menu-options-container">
                        <a className="home-menu-options" href="/"><i className="material-icons home-menu-icon">home</i>Home</a>
                        <a className="home-menu-options" onClick={this.toggleExplore}><i style={{marginLeft: 18 + 'px'}} className="material-icons home-menu-icon">explore</i>Explore</a>
                        <div className="home-explore-options-container">
                            <div className="home-explore-options">
                                <a href="/attractions"><i className="material-icons dropdown-arrow1">arrow_right</i>Attractions</a>
                                <a href="/restaurants"><i className="material-icons dropdown-arrow2">arrow_right</i>Restaurants</a>
                            </div>
                        </div>
                        <a className="home-menu-options" href="/hotels"><i className="material-icons home-menu-icon">hotel</i>Hotel</a>
                    </div>
                </div> 
                <h1 className="home-title">New York</h1>
                <div className="home-slide-show">
                    <div>
                        <i className="material-icons home-arrows" id="prevBtn" onClick={this.imageSlideShowPrev}>keyboard_arrow_left</i>
                        <i className="material-icons home-arrows" id="nextBtn" onClick={this.imageSlideShowNext}>keyboard_arrow_right</i>
                    </div>
                    <div className="home-image-holder">
                        <div className="home-image-slides">
                            <img className="img-home" src="../Home_Images/new-york-1.jpg" alt="the city of New York during day time" />
                            <img className="img-home" src="./Home_Images/new-york-2.jpg" alt="statue of liberty" />
                            <img className="img-home" src="./Home_Images/new-york-3.jpg" alt="crosswalk of New York" />
                            <img className="img-home" src="./Home_Images/new-york-6.jpg" alt="the busy street of new york" />
                            <img className="img-home" src="./Home_Images/new-york-5.jpg" alt="empire state building" />
                            <img className="img-home" src="./Home_Images/new-york-4.jpg" alt="city of New York during night time" />
                        </div>
                    </div>
                </div>
                <div className="audio-container">
                    <audio className="audio" controls="controls">
                        <source src= "/../Home_Music/JayZ_new_york.mp3" type="audio/mpeg" />
                        Your browser does not support the audio.
                    </audio>
                </div>
            </div>
        )
    }
}

export default HomePage