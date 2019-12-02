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
       
        //console.log(this.state.displayedOffers.length);        
        this.setState({
            displayedOffers: offersArray,
            allOffers: offersArray
        });
        //console.log(this.state.displayedOffers.length);
    }

    compare(a, b) {
        if (a <= b)
           return -1
        if (a >= b)
           return 1
        else return 0
     }

//var n = parseInt("2018@geeksforgeeks");

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
                    }
                }
            }   
        } if (sortCondition.length > 0) {
            if (sortCondition === "price-ascending") 
            offersToDisplay = displayedOffers.sort((a, b) => (parseInt(a.car[5]) > parseInt(b.car[5])) ? 1 : -1);
            else if (sortCondition === " price-descending") 
            offersToDisplay = displayedOffers.sort((a, b) => (parseInt(a.car[5]) < parseInt(b.car[5])) ? 1 : -1);
            else if (sortCondition === "brands-az") 
            offersToDisplay = displayedOffers.sort((a, b) => (a.car[1] > b.car[1]) ? 1 : -1);
            else if (sortCondition === "brands-za") 
            offersToDisplay = displayedOffers.sort((a, b) => (a.car[1] < b.car[1]) ? 1 : -1);
            else if (sortCondition === "none") 
            offersToDisplay = [...this.state.allOffers];
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
        if (e.target.value.length == 0) this.setState({
            displayedOffers: [...this.state.allOffers]
        }); 
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
                    <option value="price-ascending">Price ascending</option>
                    <option value="price-descending">Price descending</option>
                    <option value="brands-az">Brands A-Z</option>
                    <option value="brands-za">Brands Z-A</option>
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