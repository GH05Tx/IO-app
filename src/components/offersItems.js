import React from 'react';

export default class OffersItems extends React.Component {
    render() {
        return (
            <ul>
                {
                    this.props.content.map(function(offer) {
                    return <li key={offer.index}>
                        {offer.content}
                        </li>
                    })
                }
            </ul>
        )
    }
}