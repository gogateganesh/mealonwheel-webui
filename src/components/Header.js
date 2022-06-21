import React, { Component } from 'react'
import Menu from './svg/bars-solid.svg'
import Close from './svg/times-solid.svg'
import CartIcon from './svg/shopping-cart-solid.svg'
import { Link } from 'react-router-dom'
import './css/Header.css'
import store from './store/mystore'


export class Header extends Component {
    
    state = {
        toggle: false,
        flag: false
    }

    menuToggle = () => {
        this.setState({ toggle: !this.state.toggle })
    }

    componentDidMount =()=>
    {

    }
    
    onLogout =() =>
    {
        localStorage.removeItem("loggedinuser");
        store.dispatch({type:"OUT"});
    }
    render() 
    {
        if(localStorage.getItem("loggedinuser")!=null)
        store.subscribe(()=>{this.setState({flag: store.getState().loggedin})});
        console.log(this.state.flag);

        return (
            
            <header>
                <div className="menu">
                    <img src={Menu} alt="" width="20" />
                </div>
                <div className="Logo">
                    <h1>MEALS ON WHEELS</h1>
                </div>
                <nav>
                    <ul>
                        <li><Link to="/Home">Home</Link> </li>
                        <li><Link to="/SignUp" style={{display: this.state.flag?'none':'block'}}>Register</Link> </li>
                        <li><Link to="/LoginForm" style={{display: this.state.flag?'none':'block'}}>Login </Link> </li>
                        
                        <li><Link to="/" style={{display: this.state.flag?'block':'none'}} onClick={this.onLogout}>Logout </Link> </li>
                        <li className="close">
                            <img src={Close} alt="" width="20" />
                        </li>
                    </ul>

                    <div className="nav-cart">
                        <Link to="/cart">
                            <img src={CartIcon} alt="" width="20" />
                        </Link>
                    </div>
                </nav>

            </header>
        )
    }
}

export default Header