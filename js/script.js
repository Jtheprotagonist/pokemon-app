let pokemonRepository = (function () {
  // JavaScript code in "script.js"
  const pokemonList = [];
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=100";

  // Get a reference to the container where buttons will be inserted
  const pokemonListContainer = document.getElementById("pokemon-list");

  // Create and append buttons for each Pokémon with event listeners
  function createPokemonButtons() {
    pokemonList.forEach((pokemon) => {
      const button = document.createElement("button");
      button.textContent = pokemon.name;

      // Add Bootstrap button utility classes
      button.classList.add("btn", "btn-primary", "btn-sm", "mb-2", "mx-2");

      // Attach a click event listener to each button
      button.addEventListener("click", () => {
        showDetails(pokemon); // Changed from "pokemonRepository.showDetails(pokemon)"
      });

      pokemonListContainer.appendChild(button);
    });
  }

  // Function to load the list of Pokémon from the API
  async function loadList() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      // Assuming the API response contains a results array with Pokémon data
      const results = data.results;

      // Clear the existing list and populate it with the fetched Pokémon
      pokemonList.length = 0; // Clear the existing list

      results.forEach((pokemonData, index) => {
        const pokemon = {
          name: pokemonData.name,
          detailsUrl: pokemonData.url, // Store the details URL
        };

        pokemonList.push(pokemon);
      });
      // Create and append buttons for the fetched Pokémon
      createPokemonButtons();
    } catch (error) {
      console.error("Error loading Pokémon list:", error);
    }
  }

  async function showDetails(pokemon) {
    try {
      const response = await fetch(pokemon.detailsUrl);
      const data = await response.json();
      console.log({ pokemon });

      const modalTitle = document.querySelector(".modal-title");
      const modalBody = document.querySelector(".modal-body");

      modalTitle.textContent = `Details for ${pokemon.name}`;

      const container = document.createElement('div'); // Changed from 'h2'
      container.textContent = `Name: ${pokemon.name}`;

      // get abilities, moves
      const abilitiesList = data.abilities.map(({ ability }) => ability.name).join(', ');
      const movesList = data.moves.map(({ move }) => move.name).join(', ');

      const image = document.createElement('img');
      image.alt = pokemon.name;
      image.src = data.sprites.front_shiny;

      const abilitiesContent = document.createElement('p');
      abilitiesContent.textContent = `Abilities: ${abilitiesList}`;
      const movesContent = document.createElement('p');
      movesContent.textContent = `Moves: ${movesList}`;
      const weightContent = document.createElement('p');
      weightContent.textContent = `Weight: ${data.weight}`;

      container.appendChild(image); // Append elements to the container
      container.appendChild(abilitiesContent);
      container.appendChild(movesContent);
      container.appendChild(weightContent);

      modalBody.innerHTML = ''; // Clear modal body
      modalBody.appendChild(container); // Replace modal body content

      // You can add more details here by updating the modalBody content
      // Example: modalBody.textContent = `Height: ${pokemon.height} m`;

      // Show the modal
      $('#pokemon-modal').modal('show');
    } catch (error) {
      console.error("Error loading Pokémon details:", error);
    }
  }

  function getAll() {
    return pokemonList;
  }

  return {
    loadList,
    showDetails,
    getAll,
  };
})();

pokemonRepository.loadList();
console.log(pokemonRepository.getAll());

