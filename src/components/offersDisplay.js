import React from 'react';

import OffersItems from './offersItems';
import data from '../data/offers.json';
import FilterItems from './filterItems';
import "./style.css";
//import refreshIcon from "../data/refresh.png";

// serwer springowy -> endpointy 
// npm request -> zwraca promise 
// request("localhost:8081/getCarDATA")/(result) => { this.setState()}
// postman -> testowanie 
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

    // sends json request 
    getOffers() {
        let offersArray = [...this.state.displayedOffers];
        offersArray.splice(0, offersArray.length);
        //console.log(data.Cars.length);
    
        // reading data from the json file
        // uncomment below for function for 
        // testing purposes
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

        // sorting all the offers by their IDs   
        // it is default order
        offersArray.sort((a, b) => (parseInt(a.car[0]) > parseInt(b.car[0])) ? 1 : -1)
           
        let category1 = [];
        let category2 = [];
        let category3 = [];

        for (let i = 0; i < offersArray.length; i++) {
            category1.push(offersArray[i].car[1]);
            category2.push(offersArray[i].car[3]);
            category3.push(offersArray[i].car[6]);
        }

        category1.sort((a, b) => (a.toLowerCase() > b.toLowerCase()) ? 1 : -1);
        category2.sort((a, b) => (a.toLowerCase() > b.toLowerCase()) ? 1 : -1);
        category3.sort((a, b) => (parseInt(a) > parseInt(b)) ? 1 : -1);

        let filters = [];
        filters.push([...new Set(category1)]);
        filters.push([...new Set(category2)]);
        filters.push([...new Set(category3)]);


        document.getElementById("searchInput").value=""; 
        document.getElementById("sortSelect").value=""; 

        this.setState({
            displayedOffers: offersArray,
            allOffers: offersArray,
            filterCondition: filters,
            sortCondition: "",
            searchInput: ""
        });
    }

    searchItems = () => {
        const searchInput = this.state.searchInput;
        const sortCondition = this.state.sortCondition;
        //const filterCondition = [...this.state.filterCondition];
        const filter = [];
        //let displayedOffers = [...this.state.displayedOffers];
        //let allOffers = [...this.state.allOffers];
        const displayedOffers = [...this.state.allOffers];
        let offersToDisplay = [];
        //let offers = [...displayedOffers];

        /*
        console.log(displayedOffers);
       
        offers.car.filter(function(veh) {
           //console.log(veh.Model);
        return offers.veh.Model !== "X6";
        })
        console.log("OFFERS: ")
        for(let i =0; i<offers.length; i++) {
            console.log(offers[i]);
        }
        */

        if (filter.length < 0) {
            for (let i = 0; i < displayedOffers.length; i++) {
                for (let j = 1; j < displayedOffers[0].car.length; j++) {
                    for (let k = 0; k < filter.length; k++) {
                        /*if (displayedOffers[i].car[j].toString().includes("Opel")) {
                            offersToDisplay.push({
                                car: displayedOffers[i].car,
                                index: Math.random()
                            });
                            j = displayedOffers[0].car.length;
                        }*/
                        //console.log(displayedOffers[i].car[j])
                    }
                }
            }
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
        } else if (searchInput.length === 0 && filter.length === 0) {
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
    }

    // update sort condition state
    sortOffers = (e) => {
        this.setState({
            sortCondition: e.target.value
        });
    }
    
    // update filter condition state
    filterOffers() {}

    // update search input state
    searchForOffers = (e) => {
        this.setState({
            searchInput: e.target.value
        });
    }  

    refreshOffers = () => {
        this.getOffers();
    }

    // showing and hiding dropdown menu containing filtering options 
    showOptions = () => {    
        let displayProperty = "block";
        const dropdownElement = document.getElementById("filterDropdownContent");
        if (dropdownElement.style.display === "none") {
            dropdownElement.style.display = displayProperty;
        } else {
            document.getElementById("filterDropdownContent").style.display = "none";
        }
    }
  
    componentDidMount = () => {
       this.getOffers();
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
                    <div className="filterDropdown">
                        <span   onClick={this.showOptions}
                                className="filterPlaceholder">Filter by...</span>
                        <div    className="filterDropdownContent" 
                                id="filterDropdownContent"
                                style={{display: "none"}}>
                            <FilterItems content={[...this.state.filterCondition]} />
                        </div>
                    </div>
                    <button onClick={this.searchItems} 
                            className="searchButton">SEARCH</button>
                    <button onClick={this.refreshOffers}
                            className="refreshButton">
                            <span className="refreshSpan">&#8634;</span>
                    </button>
                </div>
                <div className="offersItems">
                    <OffersItems className="offersItems" content={this.state.displayedOffers} />
                </div>
            </div>
        )
    }
}
