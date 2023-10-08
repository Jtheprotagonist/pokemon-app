let pokemonRepository = (function() {
    // JavaScript code in "script.js"
    const pokemonList = [];
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    
    // Get a reference to the container where buttons will be inserted
    const pokemonListContainer = document.getElementById('pokemon-list');
    
    
    // Create and append buttons for each Pokémon with event listeners
    function createPokemonButtons() {
        pokemonList.forEach(pokemon => {
            const button = document.createElement('button');
            button.textContent = pokemon.name;

            // Add Bootstrap button utility classes
            button.classList.add('btn', 'btn-primary', 'btn-sm');
            
            // Attach a click event listener to each button
            button.addEventListener('click', () => {
                pokemonRepository.showDetails(pokemon);
            });
            
    
            pokemonListContainer.appendChild(button);
        });
    }
    
    // Function to load the list of Pokémon from the API
    async function loadList() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
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
    
                })
                // Create and append buttons for the fetched Pokémon
                createPokemonButtons();
            })
            .catch(error => {
                console.error('Error loading Pokémon list:', error);
            });
    }
    
    function showDetails(pokemon) {
        const modalTitle = document.querySelector('.modal-title');
        const modalBody = document.querySelector('.modal-body');
        const pokemonName = document.querySelector('#pokemon-name');
        
        modalTitle.textContent = `Details for ${pokemon.name}`;
        pokemonName.textContent = `Name: ${pokemon.name}`;
        
        // You can add more details here by updating the modalBody content
        // Example: modalBody.textContent = `Height: ${pokemon.height} m`;
        
        // Show the modal
        $('#pokemon-modal').modal('show');
    }
    

    function getAll() { 
        return pokemonList
    }

    return {
        loadList,
        showDetails,
        getAll
    }

})();

pokemonRepository.loadList()
console.log(pokemonRepository.getAll())
