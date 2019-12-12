import React from 'react';

export default class FilterItem extends React.Component {

    render() {
        return (
            <div>
                <p>Filter options</p>
                <ul>
                    
                </ul>
            </div>
        )
    }
}

/*
<li>{this.props.categoryTitle}</li>
                    {
                        this.props.filterConditions.map(function(item) {
                            return <li key={item.key}>
                                <input type="checkbox"></input>
                                <label>{item.content}</label>
                            </li>
                        })
                    }
                    */