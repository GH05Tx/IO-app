import React from "react";

import OffersItems from "./offersItems";
//import data from "../data/offers.json";
import FilterItems from "./filterItems";
import "./style.css";


export default class OffersDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // array collecting all the offers that
      // are supposed to be displayed at the moment
      displayedOffers: Array(0),
      allOffers: Array(0),
      searchInput: "",
      sortCondition: "",
      filterCondition: Array(0)
    };

    this.getOffers = this.getOffers.bind(this);
    this.checkCarId = this.checkCarId.bind(this);
  }

  // sends json request
  getOffers() {
    let offersArray = [];
    let filters = [];
    // reading data from the json file uncomment below
    // loop for testing purposes
    /*
    for (let i = 0; i < data.Cars.length; i++) {
      let carArray = [];

      carArray = [
        data.Cars[i].CarID,
        data.Cars[i].Manufacturer,
        data.Cars[i].Model,
        data.Cars[i].Type,
        data.Cars[i].DateOfProduction,
        data.Cars[i].Price,
        data.Cars[i].NumberOfSeats,
        data.Cars[i].FuelConsumption
      ];

      offersArray.push({
        car: carArray,
        index: Math.random()
      });
    }
    */

    const xhr = new XMLHttpRequest();
    //var self = this;

    xhr.onload = function(e) {
      console.log(this);
      if (xhr.status === 200) {
        let responseArray = JSON.parse(xhr.response);

        for (let i = 0; i < responseArray.length; i++) {
          let array = Object.values(responseArray[i]);

          offersArray.push({
            car: array,
            index: Math.random()
          });
        }
        this.setState(
          {
            displayedOffers: offersArray,
            allOffers: offersArray,
            sortCondition: "none",
            searchInput: ""
          }
          //,() => console.log(this)
        );
      }
    }.bind(this);

    xhr.open("GET", "http://localhost:8080/getoffers", true);
    xhr.send();

    // sorting all the offers by their
    // IDs as it is default order
    offersArray.sort((a, b) =>
      (a.car[0].toLowerCase() > b.car[0].toLowerCase() ? 1 : -1)
    );
    //console.log(offersArray);
    
    let category1 = [];
    let category2 = [];
    let category3 = [];

    for (let i = 0; i < offersArray.length; i++) {
      category1.push(offersArray[i].car[1]);    // manufacturer
      category2.push(offersArray[i].car[3]);    // type (sedan, suv, etc.)
      category3.push(offersArray[i].car[6]);    // number of seats
    }

    category1.sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1));
    category2.sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1));
    category3.sort((a, b) => (parseInt(a) > parseInt(b) ? 1 : -1));

  
    filters.push([...new Set(category1)]);
    filters.push([...new Set(category2)]);
    filters.push([...new Set(category3)]);

    document.getElementById("searchInput").value = "";
    document.getElementById("sortSelect").value = "";
   
    this.setState({
        displayedOffers: offersArray,
        allOffers: offersArray,
        filterCondition: filters
    });
  }

  // function used to veryfing whether the certain car
  // is or is not in the array - needed for the purpose
  // of filtering offers
  checkCarId(id, array) {
    let ifContains = false;
    for (let i = 0; i < array.length; i++) {
      if (array[i].car[0] === id) ifContains = true;
    }
    return ifContains;
  }

  searchItems = () => {
    const searchInput = this.state.searchInput;
    const sortCondition = this.state.sortCondition;
    const displayedOffers = [...this.state.allOffers];

    // getting the array of all the checkboxes
    // that have been clicked by the user in order to
    // use that in filtering function
    let checkedList = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    let categoriesNumber = [];
    let offersToDisplay = [];
    let filter = [];

    // filtering starts here
    if (checkedList.length > 0) {
      for (let i = 0; i < checkedList.length; i++) {
        if (parseInt(checkedList[i].value) === 0)
          filter.push([checkedList[i].nextSibling.data, 1]);
        else if (parseInt(checkedList[i].value) === 1)
          filter.push([checkedList[i].nextSibling.data, 3]);
        else if (parseInt(checkedList[i].value) === 2)
          filter.push([checkedList[i].nextSibling.data, 6]);
        categoriesNumber.push(filter[i][1]);
      }
    }
    if (filter.length > 0) {
      categoriesNumber = new Set(categoriesNumber).size;
      for (let i = 0; i < displayedOffers.length; i++) {
        let checkArray = [];
        for (let j = 0; j < filter.length; j++) {
          if (displayedOffers[i].car[parseInt(filter[j][1])] === filter[j][0]) {
            checkArray.push(true);
          }
        }
        if (checkArray.length >= categoriesNumber)
          offersToDisplay.push({
            car: displayedOffers[i].car,
            index: Math.random()
          });
      }
    }
    // filtering ends here and searching by the input starts
    if (searchInput.length > 0 && filter.length > 0) {
      const offersCopy = [...offersToDisplay];
      offersToDisplay.splice(0, offersToDisplay.length);
      //console.log(offersCopy);
      for (let i = 0; i < offersCopy.length; i++) {
        let carString = offersCopy[i].car.join(" ");
        if (carString.toLowerCase().includes(searchInput.toLowerCase())) {
          offersToDisplay.push({
            car: offersCopy[i].car,
            index: Math.random()
          });
        }
      }
      //console.log(offersToDisplay);
    } else if (searchInput.length > 0 && filter.length === 0) {
      for (let i = 0; i < displayedOffers.length; i++) {
        let carString = displayedOffers[i].car.join(" ");
        if (carString.toLowerCase().includes(searchInput.toLowerCase())) {
          offersToDisplay.push({
            car: displayedOffers[i].car,
            index: Math.random()
          });
        }
      }
    } else if (searchInput.length === 0 && filter.length === 0) {
      offersToDisplay = [...this.state.allOffers];
    }
    // searching ends here, sorting starts
    if (sortCondition.length > 0) {
      if (sortCondition === "priceAsc") {
        offersToDisplay = offersToDisplay.sort((a, b) =>
          parseInt(a.car[4]) > parseInt(b.car[4]) ? 1 : -1
        );
      } else if (sortCondition === "priceDesc") {
        offersToDisplay = offersToDisplay.sort((a, b) =>
          parseInt(a.car[4]) < parseInt(b.car[4]) ? 1 : -1
        );
      } else if (sortCondition === "brandsAz") {
        offersToDisplay = offersToDisplay.sort((a, b) =>
          a.car[1].concat(a.car[2]) > b.car[1].concat(b.car[2]) ? 1 : -1
        );
      } else if (sortCondition === "brandsZa") {
        offersToDisplay = offersToDisplay.sort((a, b) =>
          a.car[1].concat(a.car[2]) < b.car[1].concat(b.car[2]) ? 1 : -1
        );
      } else if (sortCondition === "none") {
        offersToDisplay = offersToDisplay.sort((a, b) =>
          a.car[0].toLowerCase() > b.car[0].toLowerCase() ? 1 : -1
        );
      }
    }

    // only offers that fulfill user's requirements are being displayed
    this.setState({
      displayedOffers: offersToDisplay
    });
  };

  // update sort condition state
  sortOffers = e => {
    this.setState({
      sortCondition: e.target.value
    });
  };

/*
    // update filter condition state
    filterOffers() {
        var checkedList = document.querySelectorAll('input[type="checkbox"]:checked');
        console.log(checkedList);
    }
*/

  // update search input state
  searchForOffers = e => {
    this.setState({
      searchInput: e.target.value
    });
  };

  refreshOffers = () => {
    this.getOffers();
  };

  // showing and hiding dropdown menu containing filtering options
  showOptions = () => {
    let displayProperty = "block";
    const dropdownElement = document.getElementById("filterDropdownContent");
    if (dropdownElement.style.display === "none") {
      dropdownElement.style.display = displayProperty;
    } else {
      document.getElementById("filterDropdownContent").style.display = "none";
    }
  };

  componentDidMount = () => {
    this.getOffers();
  };

  render() {
    return (
      <div className="offersDisplayContainer">
        <div className="navigation">
          <input
            id="searchInput"
            className="searchInput"
            placeholder="Search for..."
            onChange={this.searchForOffers}
          ></input>
          <select
            id="sortSelect"
            className="sortSelect"
            onChange={this.sortOffers}
          >
            <option value="" hidden>
              Sort by...
            </option>
            <option value="none">-</option>
            <option value="priceAsc">Price ascending</option>
            <option value="priceDesc">Price descending</option>
            <option value="brandsAz">Brands A-Z</option>
            <option value="brandsZa">Brands Z-A</option>
          </select>
          <div className="filterDropdown">
            <span onClick={this.showOptions} className="filterPlaceholder">
              Filter by...
            </span>
            <div
              className="filterDropdownContent"
              id="filterDropdownContent"
              style={{ display: "none" }}
            >
              <FilterItems content={[...this.state.filterCondition]} />
            </div>
          </div>
          <button onClick={this.searchItems} className="searchButton">
            SEARCH
          </button>
          <button onClick={this.refreshOffers} className="refreshButton">
            <span className="refreshSpan">&#8634;</span>
          </button>
        </div>
        <div className="offersItems">
          <OffersItems
            className="offersItems"
            content={[...this.state.displayedOffers]}
          />
        </div>
      </div>
    );
  }
}
