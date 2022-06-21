import React from "react"
import { Component } from "react";

export class TiffinUpdate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            description: "",
            price: "",
            menu: {},
            msg: ""
        }
    }

    componentDidMount = () => {
        this.getMenuDetails();
    }

    getMenuDetails = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: localStorage.getItem("loggedinuser")
        };
        fetch("http://localhost:8080/mymenu", requestOptions)
            .then(response => response.text())
            .then(data => this.onRes(data));
    }

    onRes = (data) => {
        console.log(JSON.stringify(responseJSON));
        if (data.length > 1) {
            var responseJSON = JSON.parse(data);
            this.setState({ name: responseJSON.name, description: responseJSON.description, price: responseJSON.price, menu: responseJSON })
            this.setState({ msg: "Updated" });
        }
        else
            this.setState({ msg: "Add your menu" });
    }

    updateForm = (e) => {
        e.preventDefault();
        if("menuid" in this.state.menu)
        {
            var menu = this.state.menu
            menu.name=this.state.name;
            menu.description =this.state.description;
            menu.price = this.state.price;

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(menu)
            };
            fetch("http://localhost:8080/update", requestOptions)
                .then(response => response.text())
                .then(data => this.onRes(data));
        }
        else{ 
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name:this.state.name,
                    description:this.state.description,
                    price:this.state.price,
                    spid:JSON.parse(localStorage.getItem("loggedinuser"))
                })
            };
            console.log(requestOptions.body)

            fetch("http://localhost:8080/addmenu", requestOptions)
                .then(response => response.text())
                .then(data => this.setState({msg:"Updated"}));
        }
    }
    handleChange = (e) => {
        var statename = e.target.name;
        var value = e.target.value;
        this.setState({ [statename]: value })
    }

    onReset = () => {
        this.setState({ name: "", description: "", price: "" })
    }
    render() {
        return (
            <div className="Tiff">
                <h3 className="text-center">Update todays Menu</h3>
                <div className="container">
                    <form onSubmit={this.updateForm}>
                        <div className="mb-1">
                            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                            <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} className="form-control input-sm" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                        </div>
                        <div className="mb-1">
                            <label htmlFor="pwd" className="form-label">Description</label>
                            <input type="text" value={this.state.description} onChange={this.handleChange} id="pwd" name="description" placeholder="Enter Description" className="form-control input-sm" required />
                        </div>
                        <div className="mb-1">
                            <label htmlFor="price" className="form-label">Price in rupees</label>
                            <input type="number" value={this.state.price} onChange={this.handleChange} id="price" name="price" placeholder="Enter Price" className="form-control input-sm" required />
                        </div>
                        <button type="submit" className="btn btn-primary">Update Menu</button>
                        <button style={{ margin: 10 }} onClick={this.onReset} type="reset" className="btn btn-warning">Cancel</button>
                    </form>
                    {this.state.msg}
                </div>
            </div>
        )
    }
}
export default TiffinUpdate;