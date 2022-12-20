import React, {useEffect, useState} from "react";
import { Link, useLocation, useParams } from "react-router-dom";

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
            tempArray.push(tempIngr)
        }
        setIngredients(tempArray)
    }


    return (
        <div>
        {isLoading ? 
          <div className="mt-5">Loading...</div> : 
            <div>
                <div className="d-flex justify-content-between m-3">
                    <Link to={`/home`} state={{previous: previous}} className="btn btn-primary align-self-center">Back</Link>
                    <h1 className="align-self-center"> {cocktail.strDrink}</h1>
                    <div></div>
                </div>
                <div>
                    description
                </div>
                <div>
                    <p>ingredient list</p>
                    {ingredients.map((ingredient, index) =>
                        <div className="d-flex justify-content-center mb-2" key={index}>
                            {ingredient}
                        </div> 

                    )}
                </div>
            </div>
            }
        </div>
        
    )
}