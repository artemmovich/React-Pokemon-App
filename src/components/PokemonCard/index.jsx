import React, { useState, useEffect } from 'react';
import styles from "../PokemonCard/index.module.css";

async function fetchData(url) {
   const res = await fetch(url);
   return res.json();
}

export default function PokemonCard(props) {
   const { selectedPokemon, clearHandler, parentUrl } = props;
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   const pokemonUrl = `${parentUrl}/${selectedPokemon}`;

   useEffect(() => {
      const getPokemonData = async () => {
         try {
            const result = await fetchData(pokemonUrl);
            setData(result);
         } catch (error) {
            setError(error);
         } finally {
            setLoading(false);
         }
      };

      getPokemonData();
   }, [pokemonUrl]);

   if (loading) return <div>Loading...</div>;
   if (error) return <div>Error: {error.message}</div>;
   if (!data) return <div>No data available</div>;

   return (
      <div className={styles.card}>
         <div className={styles.headerBar}>
            <h4>
               <div>{selectedPokemon}</div>
            </h4>
            <div onClick={clearHandler} className={styles.clearButton}>x</div>
         </div>
         {data.sprites && (
            <img src={data.sprites.front_default} alt={selectedPokemon} className={styles.pokemonImage} />
         )}
         <h5>Stats</h5>
         <div className={styles.statsContainer}>
            {data.stats.map((stat, statIndex) => (
               <div key={statIndex} className={styles.statItem}>
                  <p><b>{stat.stat.name}</b>: {stat.base_stat}</p>
               </div>
            ))}
         </div>
         <h3>Types</h3>
         <div className={styles.typesContainer}>
            {data.types.map((type, typeIndex) => (
               <div key={typeIndex} className={styles.typeItem}>
                  <p><b>{type.type.name}</b></p>
               </div>
            ))}
         </div>
      </div>
   );
}
