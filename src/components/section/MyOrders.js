import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export class MyOrders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            msg: ""
        }
    }

    componentDidMount = () => {
        this.loadOrders()
    }

    loadOrders = () => {
        var user = JSON.parse(localStorage.getItem("loggedinuser"))
        var spid = user.serviceproviderid;

        var url = "http://localhost:8080/getmyorders/" + spid
        console.log(url)

        fetch(url).then(response => response.json())
            .then(data => data.length > 2 ? this.setState({ orders: data }) : this.setState({ msg: "No order for you" }));
        console.log(JSON.stringify(this.state.orders));
    }
    render() {
        var orders = this.state.orders;
        return (
            <div>
                <button style={{ float: 'right' }} className="btn btn-primary" onClick={this.loadOrders} value="Refresh">Refresh</button>

                <h4 className="text-center">Your orders</h4>
                <p>{this.state.msg}</p>
                <table border={1} className="table">
                    <thead>
                        <tr>
                            <th>Customer name</th>
                            <th>Address</th>
                            <th>Quantity</th>
                            <th>Contact</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.orders.map(order =>{
                                return(
                                    <tr>
                                        <td>{order.custid.name}</td>
                                        <td>{order.custid.address}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.custid.phone}</td>
                                        <td>{order.status}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </table>
            </div>
        )
    }

}
export default MyOrders;