import React, { Component } from 'react';
import MyOrders from './MyOrders';
import TiffinUpdate from './TiffinUpdate';

class ProviderHome extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <TiffinUpdate/>       
                <MyOrders/>         
            </div>
        );
    }
}

export default ProviderHome;