import React, { Component } from 'react'
import Meals from './section/Meals'
import Details from './section/Details'
import { Route } from "react-router-dom"
import LoginForm from './section/LoginForm'
import RegForm from './section/RegForm'
import { Home } from './section/Home'
import Cart from './section/Cart'
import ProviderHome from './section/ServiceProviderHome'
import Payment from './section/Payment'

export class Section extends Component {
  render() {
    return (
      <section>
        <Route path="/meals" component={Meals} exact />
        <Route path="/mealsdetail" component={Details} />
        <Route path="/orderplaced" component={Payment} />
        <Route path="/LoginForm" component={LoginForm} exact />
        <Route path="/Signup" component={RegForm} exact />
        <Route path="/home" component={Home} exact />
        <Route path="/cart" component={Cart} exact />
        <Route path="/providerhome" component={ProviderHome} exact />
        <Route path="/" component={Home} exact />

      </section>

    )
  }
}

export default Section