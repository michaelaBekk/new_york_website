import React, {Component} from 'react';
import './hotels.css';
import $ from 'jquery';
import HotelData from './hotels.json';
import HotelResults from './hotel_results.js';

class Hotels extends Component {
    constructor(props) {
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.toggleExplore = this.toggleExplore.bind(this);
        this.selectAmenities = this.selectAmenities.bind(this);
        this.selectRating = this.selectRating.bind(this);
        this.priceSelection = this.priceSelection.bind(this);
        this.displayPrice = this.displayPrice.bind(this);
        this.hotelPriceResults = this.hotelPriceResults.bind(this);
        this.state = {
            // Hotel data based on price
            price: [ [], [], [], [], [], [], [], [], [], [], [], [] ],
            // Star Count
            count: 0,
            // Hotel data based on amenities
            amenities: [ [], [], [], [], [], [], [] ],
            // Results to display based on selections
            results: [],
            results_loaded: false
        }
    }

    // Load Hotel Data ------------
    componentDidMount() {
        const title = document.querySelector('title');
        title.innerHTML = 'New York - Hotels';

        // Price
        const intervals = [ [1, 30], [31, 50], [51, 70], [71, 90], [91, 100], [101, 150], [151, 200], [201, 250], [251, 350], [351, 450], [451, 499], [500, 1375] ];
        for(let i=0; i < HotelData.length; i++) {
            intervals.forEach((value, index) => {
                if(HotelData[i].price >= value[0] && HotelData[i].price <= value[1]) {
                    this.state.price[index].push({
                        name: HotelData[i].name, 
                        rating: HotelData[i].rating, 
                        amenities: HotelData[i].amenities, 
                        price: HotelData[i].price, 
                        description: HotelData[i].description, 
                        img: HotelData[i].img, 
                        link: HotelData[i].link
                    });
                }
            })
            // Amenities
            const amenities = ["Free Wi-Fi", "Gym", "Free Parking", "Pool/Spa", "Free Breakfast", "Dining", "Room Service"];
            HotelData[i].amenities.forEach(value => {
                for(let a=0; a < amenities.length; a++) {
                    if(value == amenities[a]) {
                        this.state.amenities[a].push(HotelData[i])
                    }
                }   
            })
        }
    }

    // Hotel Results (based on price) ------------
    hotelPriceResults() {
        const intervals = [ [1, 30], [31, 50], [51, 70], [71, 90], [91, 100], [101, 150], [151, 200], [201, 250], [251, 350], [351, 450], [451, 499], [500, 1375] ];
        const price = $('#value').html().slice(1, 4);

        intervals.forEach((value, index) => {
            if(price >= value[0] && price <= value[1]) {
                this.state.results.pop(this.state.price[index - 1]);
                this.state.results.push(this.state.price[index]);
            } 
        })

        if(this.state.results.length > 0) {
            this.setState({results_loaded: true});  
        }
    }

    // Select Hotel Options ------------------

    // Price
    displayPrice() {
        $('.white-circle').addClass('white-circle-show');
    }

    priceSelection(e) {
        $('#value').html($('#priceBar').val());
        $('#selector').css('left', $(e.target).val() + "%");
        $('#progressBar').css('width', $(e.target).val() + "%");
        $('#value').html("$" + $(e.target).val());
   
        if($('#value').html() == '$500') {
            $('#value').html("$" + $(e.target).val() + "+");
        }
    }

    // Select Rating
    selectRating(e) {
        const starCount = [
            ["1-Star", 1],
            ["2-Star", 2],
            ["3-Star", 3],
            ["4-Star", 4],
            ["5-Star", 5]
        ];

        $(e.target).next().toggleClass('selected-star');

        if($(e.target).next().hasClass('selected-star')) {
            $(e.target).next().next().show();
            $(e.target).prevAll('button').hide();
            this.state.count++;
        }else {
            $(e.target).next().next().hide();
            $(e.target).prev().prev().show();
            this.state.count--;
        }
       
        this.state.results.pop();

        for(let i=0; i < starCount.length; i++) {
            if(this.state.count === starCount[i][1]) {
                const result = HotelData.filter(hotels => (
                    hotels.rating == starCount[i][0]
                ))
                this.setState({results_loaded: true});
                this.state.results.push(result);
            }
        }
    
        if(this.state.count === 0) {
            this.setState({results_loaded: false});
        }
    }

    // Select Amenities
    selectAmenities(e) {
        this.state.results.pop();
        $(e.target).toggleClass('selected-amenity');
        
        const amenities = [".wifi", ".gym", ".parking", ".pool-spa", ".breakfast", ".dining", ".room-service"];
            for(let i=0; i < amenities.length; i++) {
                if($(amenities[i]).hasClass('selected-amenity')) {
                    this.state.results.pop(this.state.amenities[i - 1]);
                    this.state.results.push(this.state.amenities[i]);
                }
            }

            if($(e.target).hasClass('selected-amenity')) {
                this.state.count++;
            }else {
                this.state.count--;
            }

            if(this.state.count === 7) {
                this.state.results.pop();
                this.state.results.push(HotelData);
            }
         
            if(this.state.results.length > 0) {
                this.setState({results_loaded: true});
            }else {
                this.setState({results_loaded: false});
            }
    }

    // Toggle Navigation Menu ---------
    toggleMenu() {
        $('.hotel-sidebar').toggleClass('navbar--open');
        $('.hotel-reg-background').toggleClass('darken-background');
    }

    // Toggle Explore -------------
    toggleExplore() {
        $('.hotel-explore-options-container').toggleClass('show');
    }

    render() {
        document.body.style.background = "none";
        return (
            <div className="hotel-page">
                <div className="hotel-reg-background"></div>
                <div>
                    <i className="material-icons hotel-open-bar" onClick={this.toggleMenu}>reorder</i>
                </div>
                <div className="hotel-sidebar">
                    <div className="d-flex flex-column hotel-menu-options-container">
                        <a className="hotel-menu-options" href="/"><i className="material-icons hotel-menu-icon">home</i>Home</a>
                        <a className="hotel-menu-options" onClick={this.toggleExplore}><i style={{marginLeft: 18 + 'px'}} className="material-icons hotel-menu-icon">explore</i>Explore</a>
                        <div className="hotel-explore-options-container">
                            <div className="hotel-explore-options">
                                <a href="/attractions"><i className="material-icons dropdown-arrow1">arrow_right</i>Attractions</a>
                                <a href="/restaurants"><i className="material-icons dropdown-arrow2">arrow_right</i>Restaurants</a>
                            </div>
                        </div>
                        <a className="hotel-menu-options" href="/hotels"><i className="material-icons hotel-menu-icon">hotel</i>Hotel</a>
                    </div>
                </div>
                <div className="selection-options-container">
                    <h1 className="hotel-page-title">Hotel Search</h1>
                    <div className="priceRange"> 
                        <div className="price-label">Price (per night):</div>
                    </div> 
                    <div>
                        <label htmlFor="lowest price" id="low-price">$0</label>
                        <label htmlFor="highest price" id="high-price">$500+</label>
                        <div className="full-slider">
                            <input type="range" onInput={this.priceSelection} onClick={this.displayPrice} onMouseDown={this.displayPrice} onMouseUp={
                                this.displayPrice,
                                this.hotelPriceResults
                                } onTouchStart={this.displayPrice} onTouchMove={this.displayPrice}  onTouchEnd={this.hotelPriceResults} id="priceBar" name="price" min="0" max="500"  step="1" value="" />
                            <div id="progressBar"></div>
                            <div id="selector">
                                <div className="white-circle" >
                                    <center><div id="value"></div></center>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div className="stars">
                        <p className="hotel-rating">Hotel Rating:</p>
                        <div className="hotel-rating-container">
                            <button onClick={this.selectRating} className="hotel-rating-btn" id="firstRatingBtn"></button>
                            <i className="material-icons star-icons" id="firstRatingStar">grade</i>
                            <button onClick={this.selectRating} className="hotel-rating-btn" id="secondRatingBtn"></button>
                            <i className="material-icons star-icons">grade</i>
                            <button onClick={this.selectRating} className="hotel-rating-btn" id="thirdRatingBtn"></button>
                            <i className="material-icons star-icons">grade</i>
                            <button onClick={this.selectRating} className="hotel-rating-btn" id="fourthRatingBtn"></button>
                            <i className="material-icons star-icons">grade</i>
                            <button onClick={this.selectRating} className="hotel-rating-btn" id="fifthRatingBtn"></button>
                            <i className="material-icons star-icons">grade</i> 
                        </div>
                    </div>
                    <div>
                        <button className="amenities-btn" onClick={(e) => {
                            $('.amenities-dropbox').toggleClass('show-amenities');
                        }}>Amenities</button>
                    </div> 
                    <div className="amenities-dropbox">
                        <div className="d-flex flex-column">
                            <input type="checkbox" onClick={this.selectAmenities} name="amenities" className="wifi" id="amenitiesOptions" value="Free Wi-Fi" readOnly={true} />
                            <label htmlFor="wifi" className="amenitiesLabel" id="wifiLabel"><i className="material-icons wifi-icon">wifi</i>Free Wi-Fi</label>
                            <input type="checkbox" onClick={this.selectAmenities} name="amenities" className="parking" id="amenitiesOptions" value="Free Parking" readOnly={true} />
                            <label htmlFor="parking" className="amenitiesLabel" id="parkingLabel"><i className="material-icons parking-icon">local_parking</i>Free Parking</label>
                            <input type="checkbox" onClick={this.selectAmenities} name="amenities" className="breakfast" id="amenitiesOptions" value="Free Breakfast" readOnly={true} />
                            <label htmlFor="breakfast" className="amenitiesLabel" id="breakfastLabel"><i className="material-icons breakfast-icon">free_breakfast</i>Free Breakfast</label>
                            <input type="checkbox" onClick={this.selectAmenities} name="amenities" className="room-service" id="amenitiesOptions" value="Room Service" readOnly={true} />
                            <label htmlFor="room-service" className="amenitiesLabel" id="roomServiceLabel"><i className="material-icons room-service-icon">room_service</i>Room Service</label>    
                        </div>
                        <div className="d-flex flex-column" style={{marginLeft: 30 + 'px'}}>
                            <input type="checkbox" onClick={this.selectAmenities} name="amenities" className="gym" id="amenitiesOptions" value="Gym" readOnly={true} />
                            <label htmlFor="gym" className="amenitiesLabel" id="gymLabel"><i className="material-icons gym-icon">fitness_center</i>Gym</label>
                            <input type="checkbox" onClick={this.selectAmenities} name="amenities" className="pool-spa" id="amenitiesOptions" value="Pool/Spa" readOnly={true} />
                            <label htmlFor="pool-spa" className="amenitiesLabel" id="poolSpaLabel"><i className="material-icons pool-spa-icon">pool</i>Pool / Spa</label>
                            <input type="checkbox" onClick={this.selectAmenities} name="amenities" className="dining" id="amenitiesOptions" value="Dining" readOnly={true} />
                            <label htmlFor="dining" className="amenitiesLabel" id="diningLabel"><i className="material-icons dining-icon">local_dining</i>Dining</label>
                        </div>
                    </div>
                </div>
                {this.state.results_loaded ? (
                    <div className="d-flex flex-column all-hotel-results-container"> 
                        {this.state.results[0].map(hotels => {
                            return <HotelResults 
                            name= {hotels.name}
                            rating= {hotels.rating}
                            amenities= {hotels.amenities}
                            price= {hotels.price}
                            description= {hotels.description}
                            image= {hotels.img}
                            link= {hotels.link}
                            />
                        })}
                    </div>
                ): null}
            </div>
        )
    }
}

export default Hotels;