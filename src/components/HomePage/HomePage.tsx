import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from 'queries';
import { IPokemonsRes } from 'types';
import { Link } from 'react-router-dom';
import {
  Box,
  ChakraProps,
  Container,
  Heading,
  SimpleGrid,
} from '@chakra-ui/react';
import { useTheme } from 'context/ThemeContext';
import Spinball from 'components/Reuseable/Spinball/Spinball';
import CardPokemon from 'components/Reuseable/CardPokemon/CardPokemon';

const HomePage = () => {
  const theme = useTheme();
  const {
    loading,
    error,
    data,
  } = useQuery<IPokemonsRes>(GET_POKEMONS);
  const pokemons = data?.pokemons?.results;

  return (
    <Box id="Home">
      <Container {...container_style}>
        <Heading
          as="h4"
          {...heading_style}
          color={`${theme}.text`}
        >
          <Spinball height="3rem" speed="10" />
          Wild Pokemon
        </Heading>
        {loading && (
          <span>Loading...</span>
        )}
        {!loading && error && (
          <span>Error! {error.message}</span>
        )}
        {!loading && pokemons && (
          <SimpleGrid minChildWidth="9rem" spacing="40px" justifyItems="center">
            {pokemons.map((pokemon, idx) => (
              <Link to={`/pokemon/${pokemon.name}`} key={pokemon.id}>
                <CardPokemon
                  theme={theme}
                  name={pokemon.name}
                  number={idx + 1}
                  imageUrl={pokemon.image}
                  owned={0}
                />
              </Link>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
};

export default HomePage;

const container_style = {
  maxW: '960px',
  padding: '2rem',
};

const heading_style: ChakraProps = {
  color: '#2E3131',
  textAlign: 'center',
  marginTop: '1rem',
  marginBottom: '2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
