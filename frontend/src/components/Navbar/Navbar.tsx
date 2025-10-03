import { Link } from "react-router-dom"
import Signup from "../../pages/Signup/Signup";

export default function Navbar(){
    // YOU CAN WRITE TS CODE HERE
    console.log("Hello!");
    return(
        <div>
            <p>TEST!</p>
            <Link to={"/landing"}>Home!</Link>
            <Link to={"/signup"}>Signup!</Link>
        </div>
    )
}