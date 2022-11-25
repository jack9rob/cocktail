import './App.css';
import {useState} from 'react'

function App() {

  const [cocktails, setCocktails] = useState([])
  const [userInput, setUserInput] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isFound, setIsFound] = useState(false)

  async function handleApiCall(e) {
    e.preventDefault()
    console.log(process.env.REACT_APP_API_URL + `/search.php?s=margarita`)
    
    fetch(process.env.REACT_APP_API_URL + `/search.php?s=${userInput}`, {'method': "GET"})
    .then(res => res.json())
    .then(data => setCocktails(data.drinks))
    
    
    
        
      // if empty flag it
      // if not show results
    
    // if first search is empty search, search input as ingredient

    // if second search is empty, display "sorry, nothing was found"

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
      
      
      <ul>
        {cocktails.map((cocktail, index) => 
          <li key={index}>{cocktail.strDrink}</li>
        )}
      </ul>
    </div>
  );
}

export default App;
