import react from 'react';
import store from '../store/mystore';
import { motion } from 'framer-motion';
import '../css/LoginForm.css';
import { useLocation } from 'react-router';


class LoginForm extends react.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            msg: "",
            customer: {},
            provider: {}
        }
    }
    onCancel = () => {
        this.setState({
            username: "",
            password: ""
        });
    }

    validateForm = (e) => {
        e.preventDefault();
        var pass_check = false, user_check = false;
        var password = this.state.password;
        var username = this.state.username;
        if (password.length >= 6) {
            pass_check = true;
        }
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (username.length > 3 && re.test(username)) {
            user_check = true;
        }
        // if form valid
        if (pass_check && user_check) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: this.state.username.trim(),
                    password: this.state.password
                })
            };

            fetch("http://localhost:8080/postlogin", requestOptions)
                .then(response => response.text())
                .then(data => {
                    if (data.length !== 0) {
                        const jsondata = JSON.parse(data);
                        if ("custid" in jsondata) {
                            this.setState({ customer: jsondata });
                            localStorage.setItem("loggedinuser", data);

                            this.props.history.push("/meals");
                            store.dispatch({ type: "IN" });
                        }
                        else {
                            console.log(data);
                            this.setState({ provider: jsondata });
                            localStorage.setItem("loggedinuser", JSON.stringify(this.state.provider));
                            this.props.history.push("/providerhome");
                        }
                    }
                    else {
                        this.setState({ msg: "Invalid username or password" })
                    }
                });
        }
        else {
            if (!pass_check)
                this.setState({ msg: "Enter valid password" })
            if (!user_check)
                this.setState({ msg: "Enter valid username" })
        }
    }
    

    handleChange = (e) => {
        var statename = e.target.name;
        var value = e.target.value;
        this.setState({ [statename]: value })
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
            
            <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
                <div className="container1" style={{ 
      backgroundImage: `url("./images/del.jpg")` 
    }} >
                 
                    <form onSubmit={this.validateForm}>
                        <h2 >LOGIN</h2>
                            <tr>
                                <td> <label htmlFor="exampleInputEmail1" className="">Email ID</label>  </td>

                                <td><input type="email" name="username" placeholder="Username"
                                    value={this.state.username} onChange={this.handleChange} className="form-control"
                                    id="exampleInputEmail1" aria-describedby="emailHelp" required /></td>
                            </tr>
                       
                            <tr>
                                <td><label htmlFor="pwd" className="">Password</label></td>
                                <td> <input type="password" value={this.state.password} onChange={this.handleChange} id="pwd" name="password" placeholder="Password" className="form-control" minlength="6" required /></td>
                            </tr>
          
                        <tr>
                            <td> </td>
                           
                            <td><button type="submit" className="btn-primary">Login</button>
                            <button type="reset" onClick={this.onCancel} className="btn-warning">Cancel</button></td>
                        </tr>

                    </form>
                    {
                        <div className="alert alert-warning" role="alert">
                            {this.state.msg}
                        </div>
                    }
                     </div>
                
            </motion.div>
        );
    }
}

export default LoginForm;