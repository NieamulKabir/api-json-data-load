const loadCountries = () => {
    fetch('https://restcountries.com/v2/all')
        .then(res => res.json())
        .then(data => displayCountries(data))
}
loadCountries();

const displayCountries = countries => {
    // for (let country of countries) {
    //     console.log(country);
    // }
    const countriesDiv = document.getElementById('countries');
    countries.forEach(country => {
        // console.log(country);
        const div = document.createElement('div');
        div.classList.add('country');
        //
        div.innerHTML = `
            <h2>${country.name}</h2>
            <p>${country.capital}</p>
            <button onclick="loadCountryByName('${country.name}')">Details</button>
            `
        countriesDiv.appendChild(div);
    })
}
const loadCountryByName = name => {
    const url = `https://restcountries.com/v2/name/${name}`
    fetch(url)
        .then(res => res.json())
        .then(data => contryDetails(data[0]))
}
const contryDetails = country => {
    const countryDiv = document.getElementById('country-details');
    countryDiv.innerHTML = `
        <h4>${country.name}</h4>
        <p>Population:${country.population} </p>
        <img width="200px" src="${country.flag}" alt=""></img>

    `


}

