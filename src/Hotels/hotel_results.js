import React, {Component} from 'react';
import $ from 'jquery';


export default class HotelResults extends Component {
    constructor(props) {    
        super(props);
        this.nextImage = this.nextImage.bind(this);
        this.prevImage = this.prevImage.bind(this);
        this.state = {
            counter: 0
        }
    }

    displayIcons() {
        // Add Star Icons For Ratings -----------
        const ratings = document.querySelectorAll('.hotel-result-rating');
        const stars = [
            ["1-Star", "<i class='material-icons hotel-result-icons'>grade</i> 1-Star"],
            ["2-Star", "<i class='material-icons hotel-result-icons'>grade</i><i class='material-icons hotel-result-icons'>grade</i> 2-Star"],
            ["3-Star", "<i class='material-icons hotel-result-icons'>grade</i><i class='material-icons hotel-result-icons'>grade</i><i class='material-icons hotel-result-icons'>grade</i> 3-Star"],
            ["4-Star", "<i class='material-icons hotel-result-icons'>grade</i><i class='material-icons hotel-result-icons'>grade</i><i class='material-icons hotel-result-icons'>grade</i><i class='material-icons hotel-result-icons'>grade</i> 4-Star"],
            ["5-Star", "<i class='material-icons hotel-result-icons'>grade</i><i class='material-icons hotel-result-icons'>grade</i><i class='material-icons hotel-result-icons'>grade</i><i class='material-icons hotel-result-icons'>grade</i><i class='material-icons hotel-result-icons'>grade</i> 5-Star"],
        ];

        for(let i=0; i < ratings.length; i++) {
            for(let s=0; s < stars.length; s++) {
                if(ratings[i].innerHTML == stars[s][0]) {
                    ratings[i].innerHTML = stars[s][1]
                }
            }
        }

        // Add Amenity Icons For Amenities ---------------
        const amenities = document.querySelectorAll('.hotel-result-amenities');
        const amenityIcons = [
            ["Free Wi-Fi", "<i class='material-icons hotel-result-icons'>wifi</i> Free Wi-Fi"],
            ["Free Breakfast", "<i class='material-icons hotel-result-icons'>free_breakfast</i> Free Breakfast"],
            ["Free Parking", "<i class='material-icons hotel-result-icons'>local_parking</i> Free Parking"],
            ["Dining", "<i class='material-icons hotel-result-icons'>local_dining</i> Dining"],
            ["Pool/Spa", "<i class='material-icons hotel-result-icons'>spa</i> Pool/Spa"],
            ["Gym", "<i class='material-icons hotel-result-icons'>fitness_center</i> Gym"],
            ["Room Service", "<i class='material-icons hotel-result-icons'>room_service</i> Room Service"]
        ]

        for(let i=0; i < amenities.length; i++) {
            for(let a=0; a < amenityIcons.length; a++) {
                if(amenities[i].innerHTML == amenityIcons[a][0]) {
                    amenities[i].innerHTML = amenityIcons[a][1]
                }
            }
        }

        // Add Image Control Arrows
        const hotelImageContainers = document.querySelectorAll('.hotel-result-image-container');
        for(let i=0; i < hotelImageContainers.length; i++) {
            hotelImageContainers[i].addEventListener('mouseover', () => {
                hotelImageContainers[i].lastChild.innerHTML = "chevron_right"
            });

            hotelImageContainers[i].lastChild.innerHTML = "chevron_right";

            hotelImageContainers[i].addEventListener('mouseout', () => {
                hotelImageContainers[i].lastChild.innerHTML = ""
            });
            
        }
    }

    // Slide to next image ----------------
    nextImage(e) {
        const hotelImageContainer = $(e.target).parent()[0];
        const imageSlides = $(e.target).prev('.hotel-result-image-slides')[0];
        const images = imageSlides.childNodes;
        const size = images[0].clientWidth;
        
        if(this.state.counter < images.length - 1) {
            this.state.counter++;
        }

        if(this.state.counter > 0 && this.state.counter < images.length - 1) {
            hotelImageContainer.firstChild.innerHTML = "chevron_left";
            hotelImageContainer.addEventListener('mouseover', () => {
                hotelImageContainer.firstChild.innerHTML = "chevron_left";
            });
            hotelImageContainer.addEventListener('mouseout', () => {
                hotelImageContainer.firstChild.innerHTML = ""
            });
        }

        if(this.state.counter === images.length - 1) {
            hotelImageContainer.lastChild.innerHTML = "";
            hotelImageContainer.addEventListener('mouseover', () => {
                hotelImageContainer.lastChild.innerHTML = ""
            });
        }
        
        imageSlides.style.transform = 'translateX(' + (-size * this.state.counter) + 'px)';
    }

    // Slide to prev image -----------------
    prevImage(e) {
        const hotelImageContainer = $(e.target).parent()[0];
        const imageSlides = $(e.target).next('.hotel-result-image-slides')[0];
        const images = imageSlides.childNodes;
        const size = images[0].clientWidth;
        
        if(this.state.counter > 0) {
            this.state.counter--;
        }
        
        if(this.state.counter > 0 && this.state.counter < images.length - 1) { 
            hotelImageContainer.lastChild.innerHTML = "chevron_right";
            hotelImageContainer.addEventListener('mouseover', () => {
                hotelImageContainer.lastChild.innerHTML = "chevron_right";
            });
            hotelImageContainer.addEventListener('mouseout', () => {
                hotelImageContainer.lastChild.innerHTML = ""
            });
        }

        if(this.state.counter === 0) {
            hotelImageContainer.firstChild.innerHTML = "";
            hotelImageContainer.addEventListener('mouseover', () => {
                hotelImageContainer.firstChild.innerHTML = "";
            });
        }

        imageSlides.style.transform = 'translateX(' + (-size * this.state.counter) + 'px)';
    }

    // Loading Results -----------
    componentDidMount() {
        this.displayIcons();
    }

    // Updating Results -----------
    componentDidUpdate() {
        this.displayIcons();
    }

    render() {
        return (
            <div className="hotel-results-containers">
                <div className="hotel-result-image-container">
                    <i className="material-icons image-arrow" id="prevImgArrow" onClick={this.prevImage}></i>
                    <div className="hotel-result-image-slides">
                        {this.props.image.map(img => {
                            return <img src={img} className="hotel-result-images" />
                        })}
                    </div>
                    <i className="material-icons image-arrow" id="nextImgArrow" onClick={this.nextImage}></i>
                </div>
                <div style={{marginLeft:30 + 'px', width:400 + 'px'}}>
                    <div className="d-flex flex-row">
                        <p className="hotel-result-name">{this.props.name}</p>
                        <p className="hotel-result-price">${this.props.price}</p>
                    </div>
                    <div className="name-price-container">
                        <p className="hotel-result-rating">{this.props.rating}</p>
                        <a href= {this.props.link} className="hotel-result-link">Visit Website.</a>
                    </div>
                    <div className="amenities-list">
                        {this.props.amenities.map(amenity => {
                            return <p className="hotel-result-amenities">{amenity}</p>
                        })}
                    </div>
                    <p className="hotel-result-description">{this.props.description}</p>
                </div>
            </div>
        )
    }
}