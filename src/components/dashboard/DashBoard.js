import React from "react";
import request from "superagent";
import "../../styles/table.css"

class DashBoard extends React.Component {

    constructor() {
        super();
        this.state = {
            "cart": {},
            "itemsWithCount": {},
            "items": [],
            "discountedTotal": 0,
            "total": 0
        }
    }

    componentDidMount() {
        request.get('/api/carts/12345').end((err, response)=> {
            if(!err){
                var cart = response.body;
                var itemsWithCount = response.body.items;
                var things = Object.keys(response.body.items);
                var discountedTotal = response.body.discountedTotal;
                var total = response.body.total;
                this.setState({cart:cart, itemsWithCount:itemsWithCount, items:things, discountedTotal:discountedTotal, total: total});
            }else console.log(err);
        });
    }

    render() {
        return (
            <div>
                <table>
                    <caption className="cap"><b>Cart Details</b></caption>
                  <tbody>
                      <tr>
                        <th className="classHint">Type</th>
                        <th className="classHint">Price</th>
                        <th className="classHint">Count</th>
                        <th className="classHint">Expiry-date</th>
                        <th className="classHint">Discount</th>
                      </tr>
                        {
                            this.state.items.map((item, index) => {
                                var detail = JSON.parse(item);
                                return (
                                    <tr key={index}>
                                        <td className="classColumn">{detail.name}</td>
                                        <td className="classColumn">{detail.price} &#8377;</td>
                                        <td className="classColumn">{this.state.itemsWithCount[item]}</td>
                                        <td className="classColumn">{detail.endDate}</td>
                                        <td className="classColumn">{detail.discount} %</td>
                                    </tr>
                                )
                            })
                        }
                      <tr>
                          <td className="classRow" colSpan="5">Total price without discount is <b>{this.state.cart.total} &#8377;</b>.
                              Payable amount after discount <b>{this.state.cart.discountedTotal} &#8377;</b>.
                               Saved <b>{this.state.cart.total - this.state.cart.discountedTotal} &#8377;</b></td>
                      </tr>
                  </tbody>
                </table>
            </div>
        )
    }

}

export default DashBoard
