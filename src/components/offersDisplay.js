import React from 'react';

import OffersItems from './offersItems';
//import FilterItems from './filterItems';

export default class OffersDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // array collecting all the offers that 
            // are supposed to be displayed at the moment
            displayedOffers: [], 
            searchInput: "",
            sortCondition: "",
            filterCondition: [],
            //filterCategories: [{key: 1, content: 'BMW'}, {key: 2, content: 'Mercedes'}, {key: 3, content: 'Mazda'}]
            // filter categories: car.manufacturer, car.type, car.numberOfSeats
        };
    
        this.getOffers = this.getOffers.bind(this);
    }

    getOffers() {
        let offersArray = [...this.state.displayedOffers];
        offersArray.splice(0, offersArray.length);

        for(let i = 0; i < 20; i++) {
            offersArray.unshift({
                index: Math.random() * 10,
                content: Math.random()
            });
        }        
        //console.log(this.state.displayedOffers.length);        
        this.setState({
            displayedOffers: offersArray
        });
        //console.log(this.state.displayedOffers.length);
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
                    <option value="">-</option>
                    <option value="price-ascending">Price ascending</option>
                    <option value="price-descending">Price descending</option>
                    <option value="brands-az">Brands A-Z</option>
                    <option value="brands-za">Brands Z-A</option>
                </select>
                <div></div>
                <button onClick={this.getOffers}>SEARCH</button>
                <div>
                    <OffersItems content={this.state.displayedOffers} />
                </div>
            </div>
        )
    }
}

//<FilterItems categoryTitle="brand" filterConditions={this.state.filterCategories}/>
