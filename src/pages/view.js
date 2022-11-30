import React, {useEffect, useState} from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export default function View(props) {
    const location = useLocation()
    const {previous} = location.state
    const {id} = useParams()
    const [cocktail, setCocktail] = useState([])

    useEffect( () => {
        fetch(process.env.REACT_APP_API_URL + `/lookup.php?i=${id}`, {'method': "GET"})
        .then(res => res.json())
        .then(data => setCocktail(data.drinks[0]))
        // then get picture
    }, [id])
    return (
        <div>
            <h1>View</h1>
            <h3>{cocktail.strDrink}</h3>
            <Link to={`/home?previous=${previous}`} state={{previous: previous}}>Back</Link>
        </div>
        
    )
}