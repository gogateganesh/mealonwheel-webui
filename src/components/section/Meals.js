import React, { Component } from 'react'
import { DataContext } from '../Context';
import '../css/Meals.css'
import { motion } from "framer-motion";
import '../css/Meals.css'


export class Meals extends Component {

    static contextType = DataContext;
    constructor(props) {
        super(props);
        this.state = {
            menus: [],
            msg: "",
            menuid:""
        }
    }
    componentDidMount = () => {
        fetch("http://localhost:8080/menus")
            .then(response => response.json())
            .then(responseJSON => responseJSON.length < 1 ? this.setState({ msg: "error while fetching menus" }) : this.setState({ menus: responseJSON }));
    }

    addToCart = () => {

    }

    toDetails = (menu) =>{
        sessionStorage.setItem("menuid",menu.menuid);
        this.props.history.push("/mealsdetail");
    }

    render() {
        
        const pageTransition={
            in:{
                opacity:1,
                y:0
            },
            out:{
                opacity:0,
                y:"-100vh" 

            }
        };
        return (
            <motion.div  initial="out" animate="in" exit="out" variants={pageTransition}>
            <div id="meals">
                {
                    this.state.menus.map(menu => (
                        <div className="card" key={menu.menuid}>
                            <div>
                                <img src="./images/tiffin6.jpg" alt="" />
                            </div>
                            <div className="content">
                            <a style={{textDecoration:false}}>
                            <div onClick={this.toDetails.bind(this,menu)}>
                                <h3>
                                    {/*<Link to={"/mealsdetail"}>{menu.name}</Link>*/}
                                    
                                    {menu.name}
                                    
                                </h3>
                                <span>Rs= {menu.price}</span>
                                <p>{menu.description.substring(0, 30) + "...."}</p>
                            </div>
                            </a>
                            </div>
                        </div>
                    ))
                }
            </div>
            </motion.div>
        )
    }
}
export default Meals;