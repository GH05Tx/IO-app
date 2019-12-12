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
                                "Number of seats", 
                                "Fuel consumption"];

        for (let i = 0; i < headersArray.length; i++) {
            headerRow.push(<td key={Math.random()}>{headersArray[i]}</td>)
        }
  
        return (
             /*<ul>
                {
                    this.props.content.map(function(offer) {
                        let offerItem = [];
                       
                        for(let i = 0; i < offer.car.length; i++) {
                            offerItem.push(<span key={Math.random()}>{`${offer.car[i]} `}</span>)
                        }
                       
                        return <li key={Math.random()}>
                            {offerItem}
                        </li>
                    })
                }
            </ul>*/
            <table key={Math.random()}>
                <thead>
                    <tr key={Math.random()}>{headerRow}</tr>
                </thead>
                <tbody>
                    {
                        this.props.content.map(function(item) {
                            let singleRow = [];
                        
                            for (let i = 0; i < item.car.length; i++) {
                                singleRow.push(<td key={Math.random()}>{item.car[i]}</td>)
                            }
                        
                            return <tr key={item.index} align="left">{singleRow}</tr> 
                        })
                    }
                </tbody>
            </table>
        )   
    }
}