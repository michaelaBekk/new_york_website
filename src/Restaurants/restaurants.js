import React, {Component} from 'react';
import './restaurants.css';
import $ from 'jquery';
import RestaurantList from './restaurant_list.js';
import RestaurantData from './restaurant_data.json';
import {createBrowserHistory} from 'history';


export default class Restaurants extends Component {
    constructor(props) {
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.toggleExplore = this.toggleExplore.bind(this);
        this.state = {
            loaded: false,
            restaurant_name: [],
            hours: [],
            address: [],
            restaurant_phone: [],
            price_range: [],
            cuisines: [],
            img1: [],
            img2: [],
            img3: [],
            img4: [],
            img5: [],
            description: []
        }
    }

      // Toggle Navigation Menu ---------
    toggleMenu() {
        $('.restaurants-sidebar').toggleClass('navbar--open');
        $('.restaurants-reg-background').toggleClass('darken-background');
    }

    // Toggle Explore -------------
    toggleExplore() {
        $('.restaurants-explore-options-container').toggleClass('show');
    }

    // Retrieve Restaurants ---------------
    componentDidMount() {  
        const title = document.querySelector('title');
        title.innerHTML = 'New York - Restaurants';

        const history = createBrowserHistory();

        // Details ---------
        let restaurant_name = [];
        let hours = [];
        let address = [];
        let restaurant_phone = [];
        let price_range = [];
        let cuisines = [];


        RestaurantData.map(restaurant => {
            this.state.img1.push(restaurant.img[0]);
            this.state.img2.push(restaurant.img[1]);
            this.state.img3.push(restaurant.img[2]);
            this.state.img4.push(restaurant.img[3]);
            this.state.img5.push(restaurant.img[4]);
            this.state.description.push(restaurant.description);
            hours.push(restaurant.hours);
            address.push(restaurant.address);
            restaurant_phone.push(restaurant.phone);
            price_range.push(restaurant.price);
            cuisines.push(restaurant.cuisines);
            restaurant_name.push(restaurant.name);
        });

        this.setState({
            restaurant_name,
            hours,
            address,
            restaurant_phone,
            price_range,
            cuisines,
            loaded: true
        })      
    }

    render() {
        document.body.style.background = "white";
        return (
            <div>
                <div>
                    <div className="restaurants-reg-background"></div>
                    <h1 className="restaurants-page-title">Restaurants : New York</h1>
                    <div>
                        <i className="material-icons restaurants-open-bar" onClick={this.toggleMenu}>reorder</i>
                    </div>
                    <div className="restaurants-sidebar">
                        <div className="d-flex flex-column restaurants-menu-options-container">
                            <a className="restaurants-menu-options" href="/"><i className="material-icons restaurants-menu-icon">home</i>Home</a>
                            <a className="restaurants-menu-options" onClick={this.toggleExplore}><i style={{marginLeft: 18 + 'px'}} className="material-icons restaurants-menu-icon">explore</i>Explore</a>
                            <div className="restaurants-explore-options-container">
                                <div className="restaurants-explore-options">
                                    <a href="/attractions"><i className="material-icons dropdown-arrow1">arrow_right</i>Attractions</a>
                                    <a href="/restaurants"><i className="material-icons dropdown-arrow2">arrow_right</i>Restaurants</a>
                                </div>
                            </div>
                            <a className="restaurants-menu-options" href="/hotels"><i className="material-icons restaurants-menu-icon">hotel</i>Hotel</a>
                        </div>
                    </div>  
                    {this.state.restaurant_name.map((restaurant, index) => {
                        return <RestaurantList
                            restaurant_name= {restaurant}
                            hours= {this.state.hours[index]}
                            address= {this.state.address[index]}
                            phone= {this.state.restaurant_phone[index]}
                            price_range= {this.state.price_range[index]}
                            cuisines={this.state.cuisines[index]}
                            img1={this.state.img1[index]}
                            img2={this.state.img2[index]}
                            img3={this.state.img3[index]}
                            img4={this.state.img4[index]}
                            img5={this.state.img5[index]}
                            description={this.state.description[index]}
                        />
                        })}
                    </div>
            </div>
        )
    }
}