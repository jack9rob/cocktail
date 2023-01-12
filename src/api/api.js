export async function getCocktailsByName(name) {
    if(name === null || name === undefined) {
        return null
    }

    let cocktails = undefined

    await fetch(process.env.REACT_APP_API_URL + `/search.php?s=${name}`, {'method': "GET"})
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if (data.drinks) {
            console.log(data.drinks)
            console.log("drink")
            cocktails = data.drinks
        }
    })

    return cocktails
}

export async function getCocktailsByIngredient(name) {
    if(name === null || name === undefined) {
        return null
    }

    let cocktails = null

    await fetch(process.env.REACT_APP_API_URL + `/filter.php?i=${name}`, {'method': "GET"})
    .then(res => res.json())
    .then(data => {
        if (data.drinks) {
            cocktails = data.drinks
        }
    })
    .catch((error) => {
        console.log(error)
        
    })

    return cocktails
}

export async function getCocktailById(id) {
    if(id === null || id === undefined) {
        return null
    }

    let cocktails = null

    await fetch(process.env.REACT_APP_API_URL + `/lookup.php?i=${id}`, {'method': "GET"})
    .then(res => res.json())
    .then(data => {
        if (data.drinks) {
            cocktails = data.drinks[0]
        }
    })

    return cocktails
}