import React from 'react';

export default class OffersItems extends React.Component {
    render() {
        return (
            <ul>
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
            </ul>
        )   
    }
}