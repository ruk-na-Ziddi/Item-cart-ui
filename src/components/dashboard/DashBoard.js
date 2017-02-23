import React from "react";
import request from "superagent";
import "../../styles/table.css";

class DashBoard extends React.Component {

    constructor() {
        super();
        this.state = {
            "cart": {},
            "itemsWithCount": {},
            "items": [],
            "discountedTotal": 0,
            "total": 0,
            "options": [
                "laptop", "smart-phone","fitness-band","smart-watch"
            ],
            "values": {
                "laptop": {"name": "laptop", "price": 65000,"endDate": "15:08:2017","discount": 5},
                "smart-phone": {"name": "smart-phone", "price": 20000,"endDate": "15:08:2017","discount": 10},
                "fitness-band": {"name": "fitness-band", "price": 5000,"endDate": "15:08:2017","discount": 10},
                "smart-watch": {"name": "smart-watch", "price": 5000,"endDate": "15:08:2017","discount": 5}
            },
            "selectedItem" : ""
        };

        this.createCart = this.createCart.bind(this);
        this.refresh = this.refresh.bind(this);
        this.setChoice = this.setChoice.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    componentDidMount() {
        this.createCart();
        this.refresh();
    }

    refresh(){
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

    createCart(){
        var user = {"id": 12345};
        request.post('/api/carts').send(user).end((err, res) => {
            if(!err){
                console.log("Cart created");
                this.refresh();
            }
        });
    }

    setChoice(e){
        this.setState({selectedItem: e.target.value});
    }

    addItem(){
        var itemToAdd = this.state.values[this.state.selectedItem];
        request.post('/api/carts/12345').send(itemToAdd).end((err, res) => {
            if(!err){
                this.refresh();
            }
        });
    }

    render() {
        return (
            <div>
                <div className="classChoice">
                    <select onChange={this.setChoice} className="classSelect">
                        <option value="select-item">select</option>
                        {
                            this.state.options.map((option, i) => {
                                return <option key={i} value={option}>{option}</option>
                            })
                        }
                    </select>
                <div className="buttonA"><button onClick={this.addItem}>Add Item</button></div>
                </div>
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
