import React from 'react';


export default class OffersItems extends React.Component {
    render() {
        let headerRow = [];
        const headersArray = [  "ID", 
                                "Manufacturer", 
                                "Model", 
                                "Type", 
                                "Date of production", 
                                "Price", 
                                "Seats", 
                                "Fuel consumption"];

        for (let i = 1; i < headersArray.length; i++) {
            headerRow.push(<td key={Math.random()}>{headersArray[i]}</td>)
        }
  
        return (
            <table key={Math.random()}>
                <thead>
                    <tr key={Math.random()}>{headerRow}</tr>
                </thead>
                <tbody>
                    {
                        this.props.content.map(function(item) {
                            let singleRow = [];
                        
                            for (let i = 1; i < item.car.length; i++) {
                                singleRow.push(<td key={Math.random()}>{item.car[i]}</td>)
                            }
                        
                            return <tr key={item.index}>{singleRow}</tr> 
                        })
                    }
                </tbody>
            </table>
        )   
    }
}