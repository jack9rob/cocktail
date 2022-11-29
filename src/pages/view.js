import React, {useEffect, useState} from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export default function View(props) {
    const location = useLocation()
    const {previous} = location.state
    const {id} = useParams()
    const [cocktail, setCocktail] = useState({})

    useEffect( () => {
        fetch(process.env.REACT_APP_API_URL + `/lookup.php?i=${id}`, {'method': "GET"})
        .then(res => res.json())
        .then(data => console.log(data))
        // then get picture
    }, [id])
    return (
        <div>
            <h1>View</h1>
            <h2>{previous}</h2>
            <h3>{id}</h3>
            <Link to={`/home?previous=${previous}`}>Back</Link>
        </div>
        
    )
}