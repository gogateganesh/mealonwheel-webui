import React from "react";
import { motion } from "framer-motion";
import '../css/RegForm.css'


class RegForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            password1: "",
            password2: "",
            phone: "",
            address: "",
            role: "",
            loginid: 0,
            msg: ""
        }
    }
    handleChange = (e) => {
        var statename = e.target.name;
        var value = e.target.value;
        this.setState({ [statename]: value })
    }
    validateForm = (e) => 
    {
        e.preventDefault();
        //const emailregex = /^[A-Za-z0-9.]{5,}@[A-Za-z0-9.]{5,12}\.[a-z]{2,5}$/;
        // if form valid
        if(this.state.role === "customer")
            this.createLoginForUser();
        if(this.state.role === "provider")
            this.createProvider();
    }

    createProvider = () =>
    {
        const Options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                address: this.state.address,
                date_recorded: new Date().toLocaleString().split(",")[0],
                password:this.state.password2
            })
        };

        fetch("http://localhost:8080/register_provider", Options)
            .then(response => response.json())
            .then(responseJSON => 
                "serviceproviderid" in responseJSON?
                this.setState({ msg: "User created !!" }) : this.setState({msg:"error !!"}));

    }

    createLoginForUser = () =>
    {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.state.email.trim(),
                password: this.state.password2,
                role: this.state.role
            })
        };
        fetch("http://localhost:8080/loginsave", requestOptions)
            .then(response => response.json())
            .then(responseJSON =>
                this.creatUser(responseJSON.loginid));
    }

    creatUser = (loginid) => {
        console.log(loginid)
        const userOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                address: this.state.address,
                birthdate: new Date().toLocaleString().split(",")[0],
                loginid: loginid
            })
        };
        fetch("http://localhost:8080/register_customer", userOptions)
            .then(response => response.json())
            .then(responseJSON => "custid" in responseJSON ?
                this.setState({ msg: "User created !!" }) : this.setState({
                    msg:
                        "error !!"
                }));
    }


    render() {
        const pageTransition = {
            in: {
                opacity: 1,
                y: 0
            },
            out: {
                opacity: 0,
                y: "-100vh"

            }
        };
        return (
            // <div className="container" onSubmit={this.validateForm}>
            //     <form>
            //         <h2 style={{ marginTop: 10 }}>SIGN UP</h2>
            //         <table>
            //             <tbody>
            //             <tr>
            //                 <td>Enter name</td>
            //                 <td><input type="text" value=
            //                     {this.state.name} onChange={this.handleChange} name="name"
            //                     placeholder="Full Name" required /></td>
            //             </tr>
            //             <tr>
            //                 <td>Enter email </td>
            //                 <td><input type="email" value=
            //                     {this.state.email} onChange={this.handleChange} name="email"
            //                     placeholder="abc@gmail.com" required /></td>
            //             </tr>
            //             <tr>
            //                 <td>Enter Password </td>
            //                 <td><input type="password" value=
            //                     {this.state.password1} onChange={this.handleChange} name="password1"
            //                 /></td>
            //             </tr>
            //             <tr>
            //                 <td>Confirm password </td>
            //                 <td><input type="password" value=
            //                     {this.state.password2} onChange={this.handleChange} name="password2"
            //                 /></td>
            //             </tr>
            //             <tr>
            //                 <td>Enter Phone</td>
            //                 <td><input type="phone" value=
            //                     {this.state.phone} onChange={this.handleChange} name="phone" required
            //                 /></td>
            //             </tr>
            //             <tr>
            //                 <td>Enter Address </td>
            //                 <td><input type="text" value=
            //                     {this.state.address} onChange={this.handleChange} name="address" />
            //                 </td>
            //             </tr>
            //             <tr>
            //                 <td>Register as </td>
            //                 <td>
            //                     <input type="radio" id="reg"
            //                         name="role" value="provider" onChange={this.handleChange} required/>
            //                     Tiffinwala/Mess <br />
            //                     <input type="radio" id="reg"
            //                         name="role" value="customer" onChange={this.handleChange} /> Customer
            //                 </td>
            //             </tr>
            //             <tr>
            //                 <td><input type="submit" value="signup"/></td>
            //             </tr>
            //             </tbody>
            //         </table>
            //         {this.state.name}
            //         {this.state.phone}
            //         {this.state.email}
            //         {this.state.password1}
            //         {this.state.password2}
            //         {this.state.address}
            //         {this.state.role}
            //         {this.state.msg}
            //     </form>
            // </div>
            <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
                <div className="container" onSubmit={this.validateForm} style={{ 
      backgroundImage: `url("./images/3.jpg")` 
    }}>
                    <form>
                        <h2 style={{ marginTop: 10 }}>SIGN UP</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Enter name</td>
                                    <td><input type="text" className="input" value=
                                        {this.state.name} onChange={this.handleChange} name="name"
                                        placeholder="Full Name" required /></td>
                                </tr>
                                <tr>
                                    <td>Enter email </td>
                                    <td><input type="email" className="input" value=
                                        {this.state.email} onChange={this.handleChange} name="email"
                                        placeholder="abc@gmail.com" required /></td>
                                </tr>
                                <tr>
                                    <td>Enter Password </td>
                                    <td><input type="password" className="input" value=
                                        {this.state.password1} onChange={this.handleChange} name="password1" placeholder="5-12 characters"
                                    /></td>
                                </tr>
                                <tr>
                                    <td>Confirm password </td>
                                    <td><input type="password" className="input" value=
                                        {this.state.password2} onChange={this.handleChange} name="password2"
                                    /></td>
                                </tr>
                                <tr>
                                    <td>Enter Phone</td>
                                    <td><input type="phone" className="input" value=
                                        {this.state.phone} onChange={this.handleChange} name="phone" required placeholder="+91"
                                    /></td>
                                </tr>
                                <tr>
                                    <td>Enter Address </td>
                                    <td><input type="text" className="input" value=
                                        {this.state.address} onChange={this.handleChange} name="address" placeholder=""/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Register as </td>
                                    <td>
                                        <input type="radio" id="reg"
                                            name="role" value="provider" onChange={this.handleChange} required />
                                        Tiffinwala/Mess <br />
                                        <input type="radio" id="reg"
                                            name="role" value="customer" onChange={this.handleChange} /> Customer
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><input type="submit" className="input" value="Sign Up" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </motion.div>
        );
    }
}
export default RegForm;