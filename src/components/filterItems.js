import React from 'react';

export default class FilterItem extends React.Component {

    render() {
        const headersArray = [  "Manufacturer", 
                                "Type", 
                                "Number of seats"];                    
        const filtersArray = [...this.props.content];
        let contentArray = [];
   
        for (let i = 0; i < filtersArray.length; i++) {
            let rowSize = filtersArray[i].length;
            contentArray.push(
                <p className="filterHeader">
                    {headersArray[i]}
                </p>);

            for (let j = 0; j < rowSize; j++) {
                contentArray.push(
                    <label className="filterCategory">
                        <input value={filtersArray[i][j]} type="checkbox">
                        </input>
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
