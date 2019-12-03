import React from 'react';

import OffersItems from './offersItems';
import Test from './test';
import data from '../data/offers.json';
//import FilterItems from './filterItems';


export default class OffersDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // array collecting all the offers that 
            // are supposed to be displayed at the moment
            displayedOffers: [], 
            allOffers: [],
            searchInput: "",
            sortCondition: "",
            filterCondition: [],
            //filterCategories: [{key: 1, content: 'BMW'}, {key: 2, content: 'Mercedes'}, {key: 3, content: 'Mazda'}]
            // filter categories: car.manufacturer, car.type, car.numberOfSeats
        };
    
        this.getOffers = this.getOffers.bind(this);
    }

    getOffers() {
        // sends json request 
        let offersArray = [...this.state.displayedOffers];
        offersArray.splice(0, offersArray.length);
       
       /* data.Cars.map((car, i) => {
            return (
            <li key={i}>
                <p>{car.Manufacturer} {car.Model} {car.Type} {car.DateOfProduction} {car.Price} {car.NumberOfSeats} {car.FuelConsumption}</p>
           */
        /*
        for(let i = 0; i < 20; i++) {
            offersArray.unshift({
                index: Math.random() * 10,
                content: Math.random()
            });
        }
        */
        console.log(data.Cars.length);
        //offersArray.push(data.Cars.)
       
        for(let i = 0; i < data.Cars.length; i++) {
            let carArray = [];

            carArray = [data.Cars[i].CarID,
                        data.Cars[i].Manufacturer, 
                        data.Cars[i].Model, 
                        data.Cars[i].Type,
                        data.Cars[i].DateOfProduction,
                        data.Cars[i].Price,
                        data.Cars[i].NumberOfSeats,
                        data.Cars[i].FuelConsumption];

            offersArray.push({
                car: carArray,
                index: Math.random()
            });
        }
        offersArray.sort((a, b) => (parseInt(a.car[0]) > parseInt(b.car[0])) ? 1 : -1)
        console.log(offersArray)
        //console.log(this.state.displayedOffers.length);        
        this.setState({
            displayedOffers: offersArray,
            allOffers: offersArray
        });
        console.log(this.state.displayedOffers.length)
    }

    searchItems = () => {
        let searchInput = this.state.searchInput;
        let sortCondition = this.state.sortCondition;
        let filterCondition = [...this.state.filterCondition];
        let displayedOffers = [...this.state.displayedOffers];
        let offersToDisplay = [];
        console.log(displayedOffers);
        if (filterCondition.length > 0) {

        } if (searchInput.length > 0) {
            for (let i = 0; i < displayedOffers.length; i++) {
                for (let j = 0; j < displayedOffers[0].car.length; j++) {
                    if (displayedOffers[i].car[j].toLowerCase().includes(searchInput.toLowerCase())) {
                        offersToDisplay.push({
                            car: displayedOffers[i].car,
                            index: Math.random()
                        });
                        j = displayedOffers[0].car.length;
                    }
                }
            }   
        } else if (searchInput.length === 0) {
            offersToDisplay = [...this.state.allOffers];
        } if (sortCondition.length > 0) {
            if (sortCondition === "price_asc") { 
                offersToDisplay = offersToDisplay.sort((a, b) => (parseInt(a.car[5]) > parseInt(b.car[5])) ? 1 : -1); 
            } else if (sortCondition === "price_desc") {
                offersToDisplay = offersToDisplay.sort((a, b) => (parseInt(a.car[5]) < parseInt(b.car[5])) ? 1 : -1);
            } else if (sortCondition === "brands_az") {
                offersToDisplay = offersToDisplay.sort((a, b) => (a.car[1].concat(a.car[2]) > b.car[1].concat(b.car[2])) ? 1 : -1);
            } else if (sortCondition === "brands_za") {
                offersToDisplay = offersToDisplay.sort((a, b) => (a.car[1].concat(a.car[2]) < b.car[1].concat(b.car[2])) ? 1 : -1);
            } else if (sortCondition === "none") {
                offersToDisplay = offersToDisplay.sort((a, b) => (parseInt(a.car[0]) > parseInt(b.car[0])) ? 1 : -1);
            }
        }
        this.setState({
            displayedOffers: offersToDisplay
        });
    }

    // update sort condition state
    sortOffers = (e) => {
        this.setState({
            sortCondition: e.target.value
        });
    }

    // update filter condition state
    filterOffers() {

    }

    // update search input state
    searchForOffers = (e) => {
        this.setState({
            searchInput: e.target.value
        });
    
        /*if (e.target.value.length === 0) this.setState({
            displayedOffers: [...this.state.allOffers]
        }); */
}  

    refreshOffers = () => {
        this.getOffers();
    }
  
    componentDidMount = () => {
       this.getOffers();

    }

    componentDidUpdate = () => {
        //console.log(this.state);
    }

    render() {
        return (
            <div className="offersDisplayContainer">
                 <input placeholder="Search for..." onChange={this.searchForOffers}></input>
                <select onChange={this.sortOffers}>
                    <option value="" hidden>Sort by...</option>
                    <option value="none">-</option>
                    <option value="price_asc">Price ascending</option>
                    <option value="price_desc">Price descending</option>
                    <option value="brands_az">Brands A-Z</option>
                    <option value="brands_za">Brands Z-A</option>
                </select>
                <div></div>
                <button onClick={this.searchItems}>SEARCH</button>
                <button onClick={this.refreshOffers}>REFRESH</button>
                <div>
                    <OffersItems content={this.state.displayedOffers} />
                </div>
            </div>
        )
    }
}

//<FilterItems categoryTitle="brand" filterConditions={this.state.filterCategories}/>
/*
<ul>
                    {data.Cars.map((car, i) => {
                        return (
                        <li key={i}>
                            <p>{car.Manufacturer} {car.Model} {car.Type} {car.DateOfProduction} {car.Price} {car.NumberOfSeats} {car.FuelConsumption}</p>
                        </li>
                        );})
                        }
                </ul>
                */