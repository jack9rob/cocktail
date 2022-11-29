import React, {useState, useEffect} from "react";
import { useSearchParams, Link } from "react-router-dom/dist";

export default function Home() {
    const [cocktails, setCocktails] = useState([])
    const [userInput, setUserInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    
    useEffect( () => {
        const name = searchParams.get('previous')
        setUserInput(name)
        fetchCocktial()
    }, [])

    async function fetchCocktial() {
        setIsLoading(true)
        setIsError(false)

        fetch(process.env.REACT_APP_API_URL + `/search.php?s=${userInput}`, {'method': "GET"})
        .then(res => res.json())
        .then(data => {
            console.log(data)
          if (data.drinks) {
            console.log("drink")
            setCocktails(data.drinks)
            setIsLoading(false)
          } else {
            // if not found try filtering by ingredients
            fetch(process.env.REACT_APP_API_URL + `/filter.php?i=${userInput}`, {'method': "GET"})
            .then(res => res.json())
            .then(data => {
              console.log("ingredients")
              console.log(data)
              if (data.drinks) {
                setCocktails(data.drinks)
                setIsLoading(false)
              }
              else console.log("not found")
            })
            // for some reason if filtering by ingedient isnt found, nothing is returned
            .catch((error) => {
              console.log(error)
              setIsError(true)
              setIsLoading(false)
            })
          }
        })
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
          <label htmlFor='userInput'></label>
          <input name='userinput' type='text' value={userInput} onChange={onChange}></input>
          <input type="submit" value="Search"></input>
        </form> 
        
        {isLoading ? 
          <div>Loading</div> : 
          <ul>
            {cocktails.map((cocktail, index) => 
              <li key={index}>
                <Link to={`/view/${cocktail.idDrink}`} state={{previous: userInput}}>{cocktail.strDrink}</Link> 
                {/*<img src={cocktail.strDrinkThumb + '/preview'} height="100" width="100"/>*/}
            </li>
            )}
          </ul>
        }
        {isError ? <div>Sorry, Not Found</div> : <div></div>}
      </div>
    );
}