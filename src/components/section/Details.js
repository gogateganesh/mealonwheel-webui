import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import '../css/Details.css'

export class Details extends Component {

    constructor(props) {
        super(props)
        this.state = {
            meal: {},
            id: sessionStorage.getItem("menuid"),
            msg: "",
            count: 1
        }
    }

    handleChange = (e) => {
        var statename = e.target.name;
        var value = e.target.value;
        this.setState({ [statename]: value })
    }
    componentDidMount = () => {
        sessionStorage.removeItem("menuid");
        var u = "http://localhost:8080/menu/" + this.state.id;
        fetch(u)
            .then(response => response.json())
            .then(responseJSON => this.setState({meal:responseJSON}));
            console.log(JSON.stringify(this.state.meal))
    }

    placeOrder = () => {
        var userid = JSON.parse(localStorage.getItem("loggedinuser"))
        var req = JSON.stringify({
            custid: userid.custid,
            spid: this.state.meal.spid.serviceproviderid,
            quantity: this.state.count,
            status:"pending"
        })
        console.log(req)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: req
        };

        fetch("http://localhost:8080/placeorder", requestOptions)
            .then(response => response.text())
            .then(data => data.length>1?this.props.history.push("/orderplaced"):this.setState({msg:"Failed"}));
        
    }

    render() {
        var count = 1;
        return (
            <div>
                <div className="details" key={this.state.meal.menuid} >
                    <img src="./images/tiffin6.jpg" alt="" />
                    <div className="box">
                        <div className="row">
                            <h2>{this.state.meal.name}</h2><br/>
                            
                        </div>
                        <h3>Rs {this.state.meal.price}</h3>
                        <p>{this.state.meal.description}</p>
                        <label htmlFor="count">Quantity  </label>
                        <input type="number" className="count" value={this.state.count} onChange={this.handleChange} id="count" name="count" placeholder="Password" minlength="3" required />
                        <Link to="/cart" className="cart" onClick={this.placeOrder}>Make payment and place order</Link><br/>
                        <label htmlFor="count" style={{fontWeight: 'bold'}}>Total Price :{this.state.meal.price * this.state.count} </label>
                    </div>
                </div>
                {this.state.msg}
            </div>
        )
    }
}

export default Details;