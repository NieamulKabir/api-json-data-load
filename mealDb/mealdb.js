const searchFood = () => {
    const searchField = document.getElementById('search-field').value;
    document.getElementById('search-field').value = ''
    
        //load data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchField}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals));

}

const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';// clear previous search data

    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div onclick="loadMealDetail('${meal.idMeal}')" class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
                </div>
            </div>
        `
        searchResult.appendChild(div);
    })
}
const loadMealDetail = mealId => {
    // load data by id(indivisual data)
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]))
}
const displayMealDetail = meal => {
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        
            <img src="${meal.strMealThumb}" class="card-img-top w-50 mx-auto" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
                <a href="${meal.strYoutube}" target="_blank" class="btn btn-primary">Go somewhere</a>
            </div>
    `
    mealDetails.appendChild(div);
}