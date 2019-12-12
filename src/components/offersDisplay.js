import React from 'react';

import OffersItems from './offersItems';
//import Test from './test';
import data from '../data/offers.json';
import FilterItems from './filterItems';
import "./style.css";
import refreshIcon from "../data/refresh.png";

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
                
        document.getElementById("searchInput").value=""; 
        document.getElementById("sortSelect").value=""; 

        this.setState({
            displayedOffers: offersArray,
            allOffers: offersArray,
            filterCondition: [],
            sortCondition: "",
            searchInput: ""
        });

        console.log(this.state.searchInput);
        console.log(this.state.sortCondition);
    }

    searchItems = () => {
        let searchInput = this.state.searchInput;
        let sortCondition = this.state.sortCondition;
        let filterCondition = [...this.state.filterCondition];
        //let displayedOffers = [...this.state.displayedOffers];
        //let allOffers = [...this.state.allOffers];
        let displayedOffers = [...this.state.allOffers];
        let offersToDisplay = [];
        
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
            if (sortCondition === "priceAsc") { 
                offersToDisplay = offersToDisplay.sort((a, b) => (parseInt(a.car[5]) > parseInt(b.car[5])) ? 1 : -1); 
            } else if (sortCondition === "priceDesc") {
                offersToDisplay = offersToDisplay.sort((a, b) => (parseInt(a.car[5]) < parseInt(b.car[5])) ? 1 : -1);
            } else if (sortCondition === "brandsAz") {
                offersToDisplay = offersToDisplay.sort((a, b) => (a.car[1].concat(a.car[2]) > b.car[1].concat(b.car[2])) ? 1 : -1);
            } else if (sortCondition === "brandsZa") {
                offersToDisplay = offersToDisplay.sort((a, b) => (a.car[1].concat(a.car[2]) < b.car[1].concat(b.car[2])) ? 1 : -1);
            } else if (sortCondition === "none") {
                offersToDisplay = offersToDisplay.sort((a, b) => (parseInt(a.car[0]) > parseInt(b.car[0])) ? 1 : -1);
            }
        }
        this.setState({
            displayedOffers: offersToDisplay
        });

        console.log('sort: ' + this.state.sortCondition);
        console.log('search: ' + this.state.searchInput);
        console.log('displayed: ' + this.state.displayedOffers);
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
    }  

    refreshOffers = () => {
        this.getOffers();
    }

    showOptions = () => {
        let displayProperty = "inline";
        const dropdownElement = document.getElementById("filterDropdownContent");
        if(dropdownElement.style.display === "none") {
            dropdownElement.style.display = displayProperty;
        } else {
            document.getElementById("filterDropdownContent").style.display = "none";
        }
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
                <div className="navigation">
                    <input  id="searchInput" 
                        className="searchInput"
                        placeholder="Search for..." 
                        onChange={this.searchForOffers}></input>
                    <select id="sortSelect" 
                            className="sortSelect"
                            onChange={this.sortOffers}>
                        <option value="" hidden>Sort by...</option>
                        <option value="none">-</option>
                        <option value="priceAsc">Price ascending</option>
                        <option value="priceDesc">Price descending</option>
                        <option value="brandsAz">Brands A-Z</option>
                        <option value="brandsZa">Brands Z-A</option>
                    </select>
                    <div    className="filterDropdown" 
                            onClick={this.showOptions}>
                        <span className="filterPlaceholder">Filter by...</span>
                        <div    className="filterDropdownContent" 
                                id="filterDropdownContent">
                            <FilterItems content="" />
                            <p>thing</p>
                            <p>thing</p>
                            <p>thing</p>
                        </div>
                    </div>
                    <button onClick={this.searchItems} 
                            className="searchButton">SEARCH</button>
                    <button onClick={this.refreshOffers}
                            className="refreshButton">
                                <img alt ="refresh icon" src={refreshIcon}></img>
                    </button>
                </div>
                <div className="offersItems">
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