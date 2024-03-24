const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weightPokemon = document.getElementById('weight');
const heightPokemon = document.getElementById('height');
const imageContainer = document.getElementById('image-container');
const tipoPokemon = document.getElementById('types');
const hpPokemon = document.getElementById('hp');
const attackPokemon = document.getElementById('attack');
const defensePokemon = document.getElementById('defense');
const sAttackPokemon = document.getElementById('special-attack');
const sDefensePokemon = document.getElementById('special-defense');
const speedPokemon = document.getElementById('speed');

let URL = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/';

fetch(URL)
    .then((response) => response.json())
    .then(data => showPokemon(data.results))
    

const showPokemon = (arr) => {

  searchBtn.addEventListener('click', () => {
    
    const firstArr = arr.find((pokemon) => pokemon.name === searchInput.value.toLowerCase() || pokemon.id === Number(searchInput.value));

    if (firstArr) {
      pokemonName.textContent = firstArr.name;
      pokemonId.textContent = `#${firstArr.id}`;

      fetch(URL + `${firstArr.id}`)
        .then(res => res.json())
        .then(data => putImageStats(data))

      const putImageStats = (arr) => {

        let tipos = arr.types.map(tipo => `<p class="${tipo.type.name} tipo">${tipo.type.name}</p>`);
        tipos = tipos.join('');

        weightPokemon.textContent = `Weight: ${arr.weight}`;
        heightPokemon.textContent = `Height: ${arr.height}`;
        imageContainer.innerHTML = `<img id="sprite" src="${arr.sprites.front_default}" alt="${arr.name}">`;
        tipoPokemon.innerHTML = tipos;
        hpPokemon.textContent = arr.stats[0].base_stat;
        attackPokemon.textContent = arr.stats[1].base_stat;
        defensePokemon.textContent = arr.stats[2].base_stat;
        sAttackPokemon.textContent = arr.stats[3].base_stat;
        sDefensePokemon.textContent = arr.stats[4].base_stat;
        speedPokemon.textContent = arr.stats[5].base_stat;
        
      };
    } else {
      
      alert('"Pokémon not found"');
      resetDisplay();
    }
  
  });
  
};

const resetDisplay = () => {
  const sprite = document.getElementById('sprite');
  if (sprite) sprite.remove();

  pokemonName.textContent = '';
  pokemonId.textContent = '';
  weightPokemon.textContent = '';
  heightPokemon.textContent = '';
  tipoPokemon.innerHTML = '';
  hpPokemon.textContent = '';
  attackPokemon.textContent = '';
  defensePokemon.textContent = '';
  sAttackPokemon.textContent = '';
  sDefensePokemon.textContent = '';
  speedPokemon.textContent = '';

};
