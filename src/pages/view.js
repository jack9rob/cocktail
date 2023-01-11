import React, {useEffect, useState,} from "react";
import { Link, useLocation, useParams} from "react-router-dom";

export default function View(props) {
    const location = useLocation()
    const [previous, setPrevious] = useState("")
    const [cocktail, setCocktail] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {id} = useParams()

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
        <div className="">
        {isLoading ? 
          <div className="mt-5">Loading...</div> : 
            <div class="container mt-5 bg-light">
                <div className="row">
                    <div className="col-1">
                        <Link to={`/home`} state={{previous: previous}} className="btn btn-primary">Back</Link>
                    </div>
                    <div className="col-5 w-50">
                        <row className="text-center">
                            <h1 className=""> {cocktail.strDrink} / {id}</h1>
                        </row>
                        <row>
                            <img className="img-fluid" src={cocktail.strDrinkThumb} alt="..."/>
                        </row>
                        
                    </div>
                    <div className="col-10 w-25">
                        <row>
                            <h3 className="">
                                Description
                            </h3>
                            <div className="d-flex justify-content-center">
                                <p>{cocktail.strInstructions}</p>
                            </div>
                        </row>
                        <row>
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
                        </row>

                    </div>
                </div>
            </div>
        }
        </div>  
    )
}