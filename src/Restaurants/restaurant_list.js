import React, {Component} from 'react';


export default class RestaurantList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    componentDidMount() {
        const imageContainers = document.querySelectorAll('.restaurant-images-container');
        const images = [
            document.querySelectorAll('#firstImages'),
            document.querySelectorAll('#secondImages'),
            document.querySelectorAll('#thirdImages'),
            document.querySelectorAll('#fourthImages'),
            document.querySelectorAll('#fifthImages')
        ]

        setInterval(() => {
            for(let c=0; c < imageContainers.length; c++) {
                images[this.state.count][c].style.display = "none";
            }
                if(this.state.count < images.length - 1) {
                    this.state.count++;
                }else {
                    this.setState({count: 0});
                }
            for(let c=0; c < imageContainers.length; c++) {
                images[this.state.count][c].style.display = "block";
            }
        }, 3000);
    }

    render() {
        document.body.style.margin = "40px 180px";
        return (
            <div className="restaurant-info">
                <div className="restaurant-images-container container mx-auto" style={{width: 950 + 'px'}}>
                    <div className="restaurant-image-slides">
                        <img className="restaurant-image" id="firstImages" src={this.props.img1} />
                        <img className="restaurant-image" id="secondImages" src={this.props.img2} />
                        <img className="restaurant-image" id="thirdImages" src={this.props.img3} />
                        <img className="restaurant-image" id="fourthImages" src={this.props.img4} />
                        <img className="restaurant-image" id="fifthImages" src={this.props.img5} />
                    </div>
                </div>
                <div className="restaurant-list-container container mx-auto" style={{width: 600 + 'px'}}>
                    <h1 className="restaurant-name">{this.props.restaurant_name}</h1>
                    <p className="restaurant-description">{this.props.description}</p>
                    <p className="restaurant-price-range">{this.props.price_range}</p>
                    <p className="restaurant-hours">{this.props.hours}</p>
                    <p className="restaurant-address">{this.props.address}</p>
                    <p className="restaurant-phone">{this.props.phone}</p>
                    <p className="restaurant-cuisines">{this.props.cuisines}</p>
                </div>
            </div>
        )
    }
}