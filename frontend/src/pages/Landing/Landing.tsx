import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Landing(){
    
    const [user, setUser] = useState("default");

    useEffect(() => {
    const storedUser = localStorage.getItem("user") || "default";
    setUser(storedUser);
    }, []);

    return(
        <div>
            <h2>WELCOME TO THE AUTO SHOP!!!</h2>            
        </div>
    )
}