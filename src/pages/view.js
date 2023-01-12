import React, {useEffect, useState,} from "react";
import { Link, useParams} from "react-router-dom";
import { getCocktailById} from "../api/api"

export default function View() {
    const [cocktail, setCocktail] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {id} = useParams()
    const queryParameters = new URLSearchParams(window.location.search)
    const previous = queryParameters.get("previous")

    useEffect( () => {
        (async () => {
            let cocktailFetch = await getCocktailById(id)
            setCocktail(cocktailFetch)
            setIsLoading(false)
            setIngredients(getIngredients())
        })();
    }, [])

    function getIngredients() {
        let tempArray = []
        for(let i = 1; i <= 15; i++) {
            let tempIngr = cocktail["strIngredient" + i]
            let tempMeasure = cocktail["strMeasure" + i]
            if(tempIngr == null) {
                break;
            }
            tempArray.push({ingredient: tempIngr, measurement: tempMeasure})
        }
        return tempArray
    }


    return (
        <div className="">
        {isLoading ? 
          <center className="mt-5">Loading...</center> : 
            <div className="container mt-5 bg-light">
                <div className="row">
                    <div className="col-1">
                        <Link to={`/home?previous=${previous}`} className="btn btn-primary">Back</Link>
                    </div>
                    <div className="col-5 w-50">
                        <div className=" row text-center">
                            <h1 className=""> {cocktail.strDrink}</h1>
                        </div>
                        <div className="row">
                            <img className="img-fluid" src={cocktail.strDrinkThumb} alt="..."/>
                        </div>
                        
                    </div>
                    <div className="col-10 w-25">
                        <div className="row">
                            <h3 className="">
                                Description
                            </h3>
                            <div className="d-flex justify-content-center">
                                <p>{cocktail.strInstructions}</p>
                            </div>
                        </div>
                        <div className="row">
                            <h3>Ingredients</h3>
                            <div className="list-group">
                                {ingredients.map((ingredient, index) =>
                                <div className="d-flex justify-content-center text-center mb-2" key={index}>
                                    <Link to={'/home'} state={{previous: ingredient.ingredient}} className="list-group-item list-group-item-action">
                                        {ingredient.ingredient} {ingredient.measurement}
                                    </Link>
                                </div> 
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </div>  
    )
}