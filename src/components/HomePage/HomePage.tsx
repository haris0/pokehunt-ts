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
import { useEffect } from 'react';

const HomePage = () => {
  const theme = useTheme();
  const variables = {
    limit: 20,
    offset: 1,
  };
  const {
    loading,
    error,
    data,
    fetchMore,
  } = useQuery<IPokemonsRes>(GET_POKEMONS, { variables });
  const pokemons = data?.pokemons?.results;

  const handleLoadMore = () => {
    variables.offset += variables.limit;
    fetchMore({
      variables,
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (fetchMoreResult) {
          fetchMoreResult.pokemons.results = [
            ...previousResult.pokemons.results,
            ...fetchMoreResult.pokemons.results,
          ];
          return fetchMoreResult;
        }
        return previousResult;
      },
    });
  };

  const handleScroll = () => {
    const bottom = Math.ceil(
      window.innerHeight + window.scrollY,
    ) >= document.documentElement.scrollHeight;
    if (bottom) {
      console.log('at the bottom');
      handleLoadMore();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box id="Home">
      <Container {...container_style}>
        <Heading
          as="h4"
          {...heading_style}
          color={`${theme}.text`}
        >
          <Spinball height="3rem" speed="10" />
          <Box marginLeft="1rem">
            Wild Pokemon
          </Box>
        </Heading>
        {loading && (
          <span>Loading...</span>
        )}
        {!loading && error && (
          <span>Error! {error.message}</span>
        )}
        {!loading && pokemons && (
          <>
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
            <Box {...loadmore_style}>
              <Spinball height="2.5rem" speed="1" />
            </Box>
          </>
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

const loadmore_style: ChakraProps = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '2rem',
};
