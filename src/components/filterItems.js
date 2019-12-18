import React from 'react';

export default class FilterItem extends React.Component {
    clickedFilter = (e) => {
        e.target.checked=false;
    }

    render() {
        const headersArray = [  "Manufacturer", 
                                "Type", 
                                "Number of seats"];                    
        const filtersArray = [...this.props.content];
        let contentArray = [];
   
        for (let i = 0; i < filtersArray.length; i++) {
            let rowSize = filtersArray[i].length;
            contentArray.push(
                <p key={Math.random()} className="filterHeader">
                    {headersArray[i]}
                </p>);

            for (let j = 0; j < rowSize; j++) {
                contentArray.push(
                    <label key={Math.random()} className="filterCategory">
                        <input  onSubmit={this.clickedFilter} 
                                value={i} 
                                type="checkbox"/>
                        {filtersArray[i][j]}
                    </label>)
            }
        } 
      
        return (
            <ul>
                {contentArray}
            </ul>
        )
    }
}
