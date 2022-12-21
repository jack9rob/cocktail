import React, {useEffect, useState} from "react";
import { Link, useLocation} from "react-router-dom";

export default function View(props) {
    const location = useLocation()
    const [previous, setPrevious] = useState("")
    const [cocktail, setCocktail] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect( () => {
        console.log("drink l", location.state)
        if(location.state !== null) {
            const temp = location.state
            console.log("drink", temp.data[0])
            console.log("previous", temp.data[1])
            setCocktail(temp.data[0])
            setIsLoading(false)
            setIngredients([])
            getIngredients()
            setPrevious(temp.data[1])
        }
    }, [cocktail])

    function getIngredients() {
        let tempArray = []
        for(let i = 1; i <= 15; i++) {
            let tempIngr = cocktail["strIngredient" + i]
            let tempMeasure = cocktail["strMeasure" + i]
            console.log("ingre", tempIngr)
            if(tempIngr == null) {
                break;
            }
            tempArray.push({ingredient: tempIngr, measurement: tempMeasure})
        }
        setIngredients(tempArray)
    }


    return (
        <div>
        <Link to={`/home`} state={{previous: previous}} className="btn btn-primary position-absolute m-3">Back</Link>
        {isLoading ? 
          <div className="mt-5">Loading...</div> : 
            <div>
                <div className="d-flex justify-content-center m-3">
                    <h1 className="align-self-center"> {cocktail.strDrink}</h1>
                </div>
                <img className="img-fluid rounded mx-auto d-block w-25" src={cocktail.strDrinkThumb} alt="..."/>
                <div className="list-group mt-5"> 
                    <h3 className="d-flex justify-content-center mb-3">
                        Description
                    </h3>
                    <div className="d-flex justify-content-center  w-25 m-auto">
                        <p>{cocktail.strInstructions}</p>
                    </div>
                    <h3 className="d-flex justify-content-center mb-3 mt-3">
                        Ingredients
                    </h3>
                    {ingredients.map((ingredient, index) =>
                        <div className="d-flex justify-content-center text-center mb-2" key={index}>
                            <Link to={'/home'} state={{previous: ingredient.ingredient}} className="list-group-item list-group-item-action w-25">
                                {ingredient.ingredient} {ingredient.measurement}
                            </Link>
                        </div> 

                    )}
                </div>
            </div>
            }
        </div>
        
    )
}