const baseURL = "https://pokeapi.co/api/v2/pokemon";

let nextPokemon = "";
let previusPokemons = "";
const pokemonContainer = document.querySelector(".pokemon")
const inputSearh = document.querySelector("#inputSearch")

async function callApi(URL) {
    const data = await fetch(URL);
    const {next, previous, results} = await data.json();

    nextPokemon = next;
    previusPokemons = previous;

    printPokemon(results);

}

async function printPokemon(pokemons) {
    let html = "";

    pokemons.forEach(async({url}) => {
        const data = await fetch(url);
        const response = await data.json();

        html += `
        <div>
             <h2>${response.name}</h2>
             <img src="${response.sprites.other["official-artwork"].front_default}" alt="${response.name}">
        </div>
        ` 
        pokemonContainer.innerHTML = html;
    })
}

callApi(baseURL);

function getPrevius () {
    previusPokemons ? callApi(previusPokemons) : alert("ya no hay mas pokemones")
}

function getNext () {
    if(!nextPokemon) return alert("ya no hay mas pokemones");
    callApi(nextPokemon);
}
function getAll () {
    callApi(baseURL)
}


inputSearh.addEventListener('change', async(e) => {
    try {
        const search = e.target.value;
        const searchUrl = `${baseURL}/${search}`
    
        const data = await fetch(searchUrl);
        const response = await data.json();
    
        let html = "";
        html += `
        <div class="pokemon_box">
            <h2>${response.name}</h2>
            <img src="${response.sprites.other["official-artwork"].front_default}" alt="${response.name}">
        </div>
    
        `
        pokemonContainer.innerHTML = html;
    } catch (error) {
        html = "";

        html += `
        <div class="container_error">
            <h2>Lo siento tu pokemon no se encontro</h2>
            <img src="./imagenes/pikachu.jpg" alt="pikachu">
        </div>
        `
        pokemonContainer.innerHTML = html;
    }

})
