import React, { useEffect, useState } from 'react';
import styles from "./index.module.css";

async function fetchData(url) {
   const res = await fetch(url);
   if (!res.ok) {
      throw new Error('Network response was not ok');
   }
   return res.json();
}

export const PokemonGrid = ({ handleSelectPokemon, url }) => {
   const [search, setSearch] = useState('');
   const [data, setData] = useState(null);

   useEffect(() => {
      const fetchPokemonData = async () => {
         let cachedData = localStorage.getItem('pokemon-cards');
         
         if (cachedData) {
            console.log("Fetched from cache");
            setData(JSON.parse(cachedData));
         } else {
            try {
               console.log("Fetching from API");
               const result = await fetchData(url);
               setData(result);
               localStorage.setItem('pokemon-cards', JSON.stringify(result));
            } catch (error) {
               console.error('Failed to fetch data', error);
            }
         }
      };

      fetchPokemonData();
   }, [url]);

   if (!data) {
      return <div>Loading...</div>;
   }

   return (
      <div className={styles.pokemonGrid}>
         <h1 className={styles.header}>MY POKEMON</h1>
         <input
            placeholder='Search Pokemon'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
         />
         <div className={styles.listContainer}>
            {data.results
               .filter(val => val.name.toLowerCase().includes(search.toLowerCase()))
               .map((pokemon, pokemonIndex) => (
                  <div
                     onClick={handleSelectPokemon(pokemon.name)} // Correctly passing function reference
                     key={pokemonIndex}
                     className={styles.pokemon}
                  >
                     {pokemon.name}
                  </div>
               ))
            }
         </div>
      </div>
   );
};
