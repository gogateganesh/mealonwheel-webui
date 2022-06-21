
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import { DataContext } from '../Context'
import '../css/Details.css'
import '../css/Cart.css'

export class Cart extends Component {
    static contextType = DataContext;

    componentDidMount() 
    {
           

    }

    render() {
        const { cart, increase, reduction, removeMeals, total } = this.context;
        if (cart.length === 0) {
            return <h2 style={{ textAlign: "center" }}>No meals</h2>
        } else {
            return (
                <>
                    {
                        cart.map(item => (
                            <div className="details cart" key={item._id} >
                                <img src={item.src} alt="" />
                                <div className="box">
                                    <div className="row">
                                        <h2>{item.title}</h2>
                                        <span>Rs {item.price * item.count}</span>
                                    </div>
                                    <p>{item.Description}</p>
                                    <p>{item.content}</p>
                                </div>
                                
                                <div className="delete" onClick={() => removeMeals(item._id)}>X</div>
                            </div>
                        ))
                    }
                    <div className="total">
                        <Link to="/payment">Payment</Link>
                        <h3>Total :Rs {total}</h3>
                    </div>
                </>
            )
        }

    }
}
export default Cart;