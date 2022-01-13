import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from 'queries';
import { IPokemonsRes } from 'types';
import { Link, Outlet } from 'react-router-dom';

const HomePage = () => {
  const { loading, error, data } = useQuery<IPokemonsRes>(GET_POKEMONS);
  const pokemons = data?.pokemons;

  return (
    <div>
      {loading && (
        <span>Loading...</span>
      )}
      {!loading && error && (
        <span>Error! {error.message}</span>
      )}
      {!loading && pokemons && (
        <div>
          <ul>
            {pokemons.results.map((pokemon) => (
              <Link to={`/detail/${pokemon.name}`} key={pokemon.id}>
                <li>{pokemon.name}</li>
              </Link>
            ))}
          </ul>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default HomePage;
