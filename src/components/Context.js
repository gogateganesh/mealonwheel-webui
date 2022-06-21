import React, { Component } from 'react'


export const DataContext = React.createContext();

export class DataProvider extends Component {
    state = {
        meals: [
            {
                "_id": "1",
                "title": "Kulkarni Mess",
                "src": "./images/tiffin6.jpg",
                "Description": "3 Chapati,2 plate rice,Paneer Sabji",
                "count": 1,
                "price": 60
            },

            {
                "_id": "2",
                "title": "Nevdekar Mess",
                "src": "./images/tiffin6.jpg",
                "Description": "2 Chapati,2 plate rice,Aloo sabji,Dal fry",
                "count": 1,
                "price": 80
            },

            {
                "_id": "3",
                "title": "Ballus Tiffin",
                "src": "./images/tiffin6.jpg",
                "Description": "3 Chapati,1 plate rice,matar sabji,salad",
                "count": 1,
                "price": 70

            },
        ],
        cart: [],
        total: 0

    };

    addCart = (id) => {
        //method to add to the cart
        const { meals, cart } = this.state;
        const check = cart.every(item => {
            return item._id !== id
        })

        if (check) {
            const data = meals.filter(meals => {
                return meals._id === id
            })

            this.setState({ cart: [...cart, ...data] })
        }
        else {
            alert("Meal has been added to the cart")
        }

    };

    reduction = id => {
        const { cart } = this.state;
        cart.forEach(item => {
            if (item._id === id) {
                item.count === 1 ? item.count = 1 : item.count -= 1;
            }
        })
        this.setState({ cart: cart });
        this.getTotal();
    };


    increase = id => {
        const { cart } = this.state;
        cart.forEach(item => {
            if (item._id === id) {
                item.count += 1;
            }
        })
        this.setState({ cart: cart });
        this.getTotal();
    };

    removeMeals = id => {
        if (window.confirm("Do you want to delete this meal ?")) {
            const { cart } = this.state;
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1)
                }
            })
            this.setState({ cart: cart })
            this.getTotal();
        }

    };
    getTotal = () => {
        const { cart } = this.state;
        const res = cart.reduce((Prev, item) => {
            return Prev + (item.price * item.count);
        }, 0)
        this.setState({ total: res })
    };
    componentDidUpdate() {
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    };

    componentDidMount() {
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if (dataCart != null) {
            this.setState({ cart: dataCart });
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if (dataCart != null) {
            this.setState({ total: dataTotal });
        }
    }
    render() {
        const { meals, cart, total } = this.state;
        const { addCart, reduction, increase, removeMeals, getTotal } = this;
        return (
            <DataContext.Provider value={{ meals, addCart, cart, reduction, increase, removeMeals, total, getTotal }}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}


