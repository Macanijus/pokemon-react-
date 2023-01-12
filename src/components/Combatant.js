const Combatant = ({ pokemon, pic }) => {
  return (
    <div className="pokemonsDisplay">
      <h1>Name: {pokemon?.name.english}</h1>
      <img className="pic size" src={pic} alt={pokemon?.name.english} />
      <h2>Attack: {pokemon?.base.Attack}</h2>
      <h2>HP: {pokemon?.base.HP}</h2>
      <h2>Defense: {pokemon?.base.Defense}</h2>
      <div>
        <h2>Type:</h2>
        {pokemon?.type.map((item, index) => (
          <h2 key={index}>{item}</h2>
        ))}
      </div>
    </div>
  );
};

export default Combatant;
