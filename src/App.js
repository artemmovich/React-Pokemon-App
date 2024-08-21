import React, { useState, Suspense } from 'react';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import PokemonCard from './components/PokemonCard';
import { PokemonGrid } from './components/PokemonGrid';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const url = 'https://pokeapi.co/api/v2/pokemon';

  function handleSelectPokemon(pokemon) {
    return () => {
      setSelectedPokemon(pokemon);
    };
  }

  return (
    <ErrorBoundary fallback={<div>Error...</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="App">
          {selectedPokemon ? (
            <PokemonCard 
              parentUrl={url} 
              selectedPokemon={selectedPokemon} 
              clearHandler={() => setSelectedPokemon(null)} 
            />
          ) : (
            <PokemonGrid 
              url={url} 
              handleSelectPokemon={handleSelectPokemon} 
            />
          )}
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
