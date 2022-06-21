import { AnimatePresence, motion } from "framer-motion";
import React from "react"
import { Component } from "react";
import { useLocation } from "react-router";
import '../css/Home.css'

export class Home extends Component {



    render() {
        const pageTransition = {
            in: {
                opacity: 3,
                y: 0
            },
            out: {
                opacity: 0,
                y: "-100vh"

            }
        };



        return (
            <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
                <div style={{ overflowX: "hidden" }} className="home">
                    <img src="./images/tiffin1.jpg" alt="" />
                    
                </div>
            </motion.div>
        )
    }
}
export default Home;