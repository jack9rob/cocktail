import React, {useEffect, useState} from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export default function View(props) {
    const location = useLocation()
    const {previous} = location.state
    const {id} = useParams()
    const [cocktail, setCocktail] = useState([])
    const [ingredients, setIngredients] = useState([])

    useEffect( () => {
        // reset ingredient list
        setIngredients([])
        fetch(process.env.REACT_APP_API_URL + `/lookup.php?i=${id}`, {'method': "GET"})
        .then(res => res.json())
        .then(data => setCocktail(data.drinks[0]))
        // then get picture
        let temp = []
        for(let i = 1; i <= 15; i++) {
            let ingr = cocktail["strIngredient"+i]
            let measure = cocktail["strMeasure"+i]
            if(ingr == null) {
                console.log(i, "null")
                break
            }
            console.log(ingr)
            temp.push([ingr, measure])
            console.log(temp)
            
        }
        setIngredients(temp)
        console.log(ingredients)
    }, [])
    return (
        <div>
            <div className="d-flex justify-content-between m-3">
                <Link to={`/home?previous=${previous}`} state={{previous: previous}} className="btn btn-primary align-self-center">Back</Link>
                <h1 className="align-self-center"> {cocktail.strDrink}</h1>
                <div></div>
            </div>
            <div>
                description
            </div>
            <div>
                <p>ingredient list</p>
            </div>
        </div>
        
    )
}