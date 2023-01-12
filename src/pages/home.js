import React, {useState, useEffect} from "react";
import { useSearchParams, Link, useLocation} from "react-router-dom";
import {getCocktailById, getCocktailsByName, getCocktailsByIngredient} from "../api/api"

export default function Home() {
    const [cocktails, setCocktails] = useState([])
    const [userInput, setUserInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

    //trying to get previous drink searched
    const location = useLocation()
    //const {previous} = location.state
    
    useEffect( () => {
      if(location.state !== null) {
        const {previous} = location.state
        fetchCocktial(previous)
      }

    }, [])

    async function fetchCocktial(name) {
        setIsLoading(true)
        setIsError(false)
        let cocktailName = userInput
        if(name !== undefined) {
          cocktailName = name
          setUserInput(name)
        }
        console.log(cocktailName)

        // search by name
        let data = await getCocktailsByName(cocktailName)
        console.log()
        if(data) {
          console.log("found name")
          console.log(data)
          setCocktails(data)
          setIsLoading(false)
        } else {
          let data = await getCocktailsByIngredient(cocktailName)
          console.log("ingredient fetch", data)
          if(data) {
            setCocktails(data)
            console.log("found ingre")
            return
          }
          console.log("not found")
          setIsError(true)
          setIsLoading(false)
        }
    }
    
    async function handleApiCall(e) {
        e.preventDefault()
        if(userInput !== ""){
            fetchCocktial()
        }
        
    }
    const onChange = (event) => {
      setUserInput(event.target.value)
    }
  
    return (
      <div className="App">
        <form onSubmit={handleApiCall}>
          <label htmlFor='userInput' className='form-label'></label>
          <div className="row d-flex justify-content-center">
            <div>
              <p>Enter a drink name or ingredient!</p>
            </div>
            <div className="row-md-6 w-25 mb-3">
              <input name='userInput' className="form-control" type='text' value={userInput} onChange={onChange}></input>
            </div>
            <div className="row-md-6">
              <input type="submit" value="Search"></input>
            </div>
            
          </div>

          
        </form> 
        
        {isLoading ? 
          <div className="mt-5">Loading...</div> : 
          <div className="list-group mt-5">
            {cocktails.map((cocktail, index) =>
            <div className="d-flex justify-content-center mb-2" key={index}>
                <Link to={`/view/${cocktail.idDrink}`} state={{data: userInput}}  className="list-group-item list-group-item-action w-25">
                  {cocktail.strDrink}
                {/*<img src={cocktail.strDrinkThumb + '/preview'} height="100" width="100"/>*/}
                </Link> 
            </div> 

            )}
          </div>
        }
        {isError ? <div>Sorry, Not Found</div> : <div></div>}
      </div>
    );
}