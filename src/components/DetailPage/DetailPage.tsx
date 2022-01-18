import { useQuery } from '@apollo/client';
import {
  Box,
  ChakraProps,
  Container,
  Image,
  Text,
} from '@chakra-ui/react';
import { TypeColors } from 'colors';
import { GET_POKEMON_DETAIL } from 'queries';
import { useParams } from 'react-router-dom';
import { IPokemonDetRes } from 'types';
import pokeball from 'assets/Pokeball.png';
import pokeEgg from 'assets/PokeEgg.png';
import PokemonSize from './child/PokemonSize';
import PokemonStats from './child/PokemonStats';
import PokemonMoves from './child/PokemonMoves';
import PokemonAbilities from './child/PokemonAbilities';
import PokemonTypes from './child/PokemonTypes';
import LoadingSkeleton from './child/LoadingSkeleton';
import CatchButton from './child/CatchButton';

const DetailPage = () => {
  const params = useParams();
  const {
    loading,
    error,
    data,
  } = useQuery<IPokemonDetRes>(GET_POKEMON_DETAIL, {
    variables: {
      name: params.name,
    },
  });
  const pokemon = data?.pokemon;
  const typeColor = TypeColors[pokemon?.types[0].type.name || 'normal'];

  const handleCatch = () => {
    console.log('cathc');
  };

  return (
    <Box id="Detail">
      {loading && (
        <LoadingSkeleton />
      )}
      {!loading && error && (
        <span>Error! {error.message}</span>
      )}
      {!loading && data && (
        <Box>
          <Box
            {...banner_style}
            bgColor={typeColor}
          />
          <Container {...container_style}>
            <Box display={{ md: 'flex' }}>
              <Box flexShrink={0} {...left_box} width={{ md: '30%' }}>
                <Box {...image_box}>
                  <Image
                    src={pokemon?.sprites.front_default}
                    fallbackSrc={pokeEgg}
                    width="17rem"
                    alt={pokemon?.name}
                    zIndex={99}
                  />
                </Box>
                <Box
                  {...exp_box}
                  border={`2px solid ${typeColor}`}
                >
                  <Text transform="skew(15deg);">
                    BASE EXP {pokemon?.base_experience}
                  </Text>
                </Box>
                <Text {...name_style}>
                  {pokemon?.name}
                </Text>
                <PokemonTypes types={pokemon?.types} />
                <PokemonSize height={pokemon?.height} weight={pokemon?.weight} />
              </Box>
              <Box
                pt={1}
                pl={{ md: 10 }}
                width={{ md: '70%' }}
              >
                <Box>
                  <Text {...sub_title}>Ability:</Text>
                  <PokemonAbilities abilities={pokemon?.abilities} typeColor={typeColor} />
                </Box>
                <Box>
                  <Text {...sub_title}>Stats:</Text>
                  <PokemonStats stats={pokemon?.stats} />
                </Box>
                <Box>
                  <Text {...sub_title}>Moves:</Text>
                  <PokemonMoves moves={pokemon?.moves} typeColor={typeColor} />
                </Box>
              </Box>
            </Box>
            <CatchButton
              bgColor={typeColor}
              pokemonName={pokemon?.name as string}
              pokemonCount={0}
              handleCatch={handleCatch}
            />
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default DetailPage;

const banner_style: ChakraProps = {
  width: '100%',
  height: '12rem',
  bgSize: '160px',
  bgPosition: 'center center',
  bgRepeat: 'no-repeat',
  bgImage: `url(${pokeball})`,
};

const container_style: ChakraProps = {
  maxW: '960px',
  padding: '0rem 1rem 6rem 1rem',
};

const left_box : ChakraProps = {
  position: 'relative',
  marginTop: '-11rem',
};

const image_box: ChakraProps = {
  display: 'flex',
  justifyContent: 'center',
};

const exp_box: ChakraProps = {
  marginTop: '-1.5rem',
  textAlign: 'center',
  marginBottom: '0.5rem',
  padding: '0.1rem 1rem',
  transform: 'skew(-15deg)',
  fontWeight: '900',
};

const name_style: ChakraProps = {
  textAlign: 'center',
  textTransform: 'capitalize',
  fontWeight: 'bold',
  marginTop: '-0.4rem',
  fontSize: '32px',
};

const sub_title: ChakraProps = {
  marginTop: '1rem',
  fontSize: '26px',
  fontWeight: '900',
};
