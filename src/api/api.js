async function getCocktailsByName(name) {
    if(name == null || name == undefined) {
        return null
    }

    let cocktails = null

    await fetch(process.env.REACT_APP_API_URL + `/search.php?s=${name}`, {'method': "GET"})
    .then(res => res.json())
    .then(data => {
        if (data.drinks) {
            console.log("drink")
            cocktails = data.drinks
        }
    })

    return cocktails
}

async function getCocktailsByIngredient(name) {
    if(name == null || name == undefined) {
        return null
    }

    let cocktails = null

    await fetch(process.env.REACT_APP_API_URL + `/filter.php?i=${name}`, {'method': "GET"})
    .then(res => res.json())
    .then(data => {
        if (data.drinks) {
            console.log("drink")
            cocktails = data.drinks
        }
    })

    return cocktails
}

async function getCocktailById(id) {
    if(id == null || id == undefined) {
        return null
    }

    await fetch(process.env.REACT_APP_API_URL + `/lookup.php?i=${id}`, {'method': "GET"})
    .then(res => res.json())
    .then(data => {
        if (data.drinks) {
            console.log("drink")
            cocktails = data.drinks
        }
    })
}