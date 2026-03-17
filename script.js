const button = document.getElementById("searchBtn");
const input = document.getElementById("pokemonInput");
const image = document.querySelector("img");
const nameElement = document.querySelector("h2");
const typeElement = document.getElementById("typ");
const suggestions = document.getElementById("suggestions");
const card = document.getElementById("card");
const typeColors = {
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    psychic: "#F85888",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    fairy: "#EE99AC",
    normal: "#A8A878",
    fighting: "#C03028",
    flying: "#A890F0",
    poison: "#A040A0",
    ground: "#E0C068",
    rock: "#B8A038",
    bug: "#A8B820",
    ghost: "#705898",
    steel: "#B8B8D0"
};
let pokemonList = [];

button.addEventListener("click", function()  {
    const pokemonName = input.value.toLowerCase();

    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
    .then(function(response) {

        if (!response.ok) {
            throw new Error("Nie znaleziono Pokemona");
        }
        return response.json();
    })
    .then(function(data) {

        const pokemonType = data.types[0].type.name;
        
        nameElement.textContent = data.name;
        image.src = data.sprites.front_default;
        typeElement.textContent = data.types[0].type.name;

        card.style.backgroundColor = typeColors[pokemonType];

        const cardLink = document.getElementById("cardmarketlink");
        cardLink.href = "https://www.cardmarket.com/en/Pokemon/Products/Search?category=-1&searchString=" + data.name;
    })
    .catch(function(){
        alert("Nie znaleziono Pokemona!");
    });

});

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        button.click();
    }
})

const background = document.querySelector(".background");

for (let i = 0; i < 20; i++) {
    const ball = document.createElement("div");
    ball.classList.add("pokeball");

    ball.style.left = Math.random() * 100 + "vw";
    ball.style.animationDuration = (3 + Math.random() * 5 + "s");
    ball.style.opacity = Math.random();

    background.appendChild(ball);
}

fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
.then(function(response){
    return response.json();
})
.then(function(data){
    pokemonList = data.results;
});

input.addEventListener("input", function(){

    const value = input.value.toLowerCase();

    suggestions.innerHTML = "";

    if (value.length === 0){
        return;
    }

    const filtered = pokemonList.filter(function(pokemon){
        return pokemon.name.startsWith(value);
    });

    filtered.slice(0,5).forEach(function(pokemon){

        const div = document.createElement("div");

        div.textContent = pokemon.name;

        div.classList.add("suggestion");

        div.addEventListener("click", function(){
            input.value = pokemon.name;
            suggestions.innerHTML = "";
        });

        suggestions.appendChild(div);
    });
});



