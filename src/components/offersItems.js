import React from "react";
export default class OffersItems extends React.Component {
  render() {
    let headerRow = [];
    const alertString =
      "We are sorry. Right now we have no offers to show. Refresh and try again.";
    const headersArray = [  "ID",
                            "Manufacturer",
                            "Model",
                            "Type",
                            "Price",
                            "Available",
                            "Seats",
                            "Fuel consumption",
                            "Production" ];

    for (let i = 1; i < headersArray.length; i++) {
      headerRow.push(<th key={Math.random()}>{headersArray[i]}</th>);
    }

    if (this.props.content.length !== 0) {
      return (
        <table key={Math.random()}>
          <thead>
            <tr key={Math.random()}>{headerRow}</tr>
          </thead>
          <tbody>
            {this.props.content.map(function(item) {
              let singleRow = [];

              for (let i = 1; i < item.car.length; i++) {
                singleRow.push(<td key={Math.random()}>{item.car[i]}</td>);
              }

              return <tr key={item.index}>{singleRow}</tr>;
            })}
          </tbody>
        </table>
      );
    } else
        return (
            <table key={Math.random()}>
            <thead>
                <tr key={Math.random()}>{headerRow}</tr>
            </thead>
            <tbody>
                <tr>
                    <td colSpan={headersArray.length}>
                        <div className="alertBox">
                        <h1>Upsss...</h1>
                        <p>{alertString}</p>
                        </div>
                    </td>
                </tr>
            </tbody>
            </table>
        );
  }
}
