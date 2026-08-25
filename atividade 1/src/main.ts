async function fetchPokemon(id: number): Promise<Blob | null> {
    try {
        const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('error ao buscar imagem');

        const data: Blob = await response.blob();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

function createPokemonImage(pokemonBlob: Blob, pokemonId: number): HTMLImageElement {
    const url = URL.createObjectURL(pokemonBlob);
    const img = document.createElement('img');
    img.src = url;
    img.alt = `Imagem do Pokémon de id ${pokemonId}`;
    return img;
}

let POKEMON_ID: number = 0;

async function main() {
    POKEMON_ID++;
    const pokemonBlob = await fetchPokemon(POKEMON_ID);
    const mainContainer = document.getElementById('main-container');

    if (pokemonBlob) {
        const pokemonImage = createPokemonImage(pokemonBlob, POKEMON_ID);
        if (mainContainer) {
            const pokemonContainer = document.createElement('div');
            pokemonContainer.classList.add('pokemon-box');
            pokemonContainer.style.borderColor = (POKEMON_ID % 2 === 0) ? 'red' : 'black';
            pokemonContainer.appendChild(pokemonImage);
            pokemonContainer.appendChild(document.createTextNode(`#${POKEMON_ID}`));

            mainContainer.appendChild(pokemonContainer);
        }
    } else {
        console.error('Não foi possível carregar a imagem do Pokémon.');
    }
}

document.addEventListener('click', main);