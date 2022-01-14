import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from 'queries';
import { IPokemonsRes } from 'types';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
} from '@chakra-ui/react';
import { useTheme } from 'context/ThemeContext';
import Spinball from 'components/Spinball/Spinball';

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
        <Heading {...heading_style} color={`${theme}.text`}>
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
          <SimpleGrid minChildWidth="9rem" spacing="40px">
            {pokemons.map((pokemon) => (
              <Link to={`/pokemon/${pokemon.name}`} key={pokemon.id}>
                <Box bg="tomato" height="80px" />
                <li>{pokemon.name}</li>
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
  paddingTop: '2rem',
  paddingBottom: '2rem',
};

const heading_style = {
  as: 'h4' as const,
  color: '#2E3131',
  textAlign: 'center' as const,
  marginTop: '1rem',
  marginBottom: '2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
