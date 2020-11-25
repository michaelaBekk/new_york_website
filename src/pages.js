import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './Home/home_page.js';
import Attractions from './Attractions/attractions.js';
import Restaurants from './Restaurants/restaurants.js';
import Hotels from './Hotels/hotels.js';
import Error404 from './Errors/error_404.js';
import ServerError from './Errors/server_error.js';


class Pages extends Component {
  constructor() {
    super();
  }

    render() {
      return (
          <Router>
            <div>
              <Switch>
                <Route exact strict path="/" component={HomePage} />
                <Route exact strict path="/attractions" component={Attractions} />
                <Route exact strict path="/restaurants" component={Restaurants} />
                <Route exact strict path="/hotels" component={Hotels} />
                <Route exact strict path="/server-error" component={ServerError} />
                <Route exact strict path="*" component={Error404} />
              </Switch>
            </div>
          </Router>
      );
    }
  }

export default Pages;
