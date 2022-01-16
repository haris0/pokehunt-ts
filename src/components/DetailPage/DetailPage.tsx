import { useQuery } from '@apollo/client';
import {
  Badge,
  Box, ChakraProps, Container, Image, Stat, StatGroup, StatLabel, StatNumber, Text,
} from '@chakra-ui/react';
import { TypeColors } from 'colors';
import { GET_POKEMON_DETAIL } from 'queries';
import { useParams } from 'react-router-dom';
import { IPokemonDetRes } from 'types';
import pokeball from 'assets/Pokeball.png';
import pokeEgg from 'assets/PokeEgg.png';

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

  return (
    <Box id="Detail">
      {loading && (
        <span>Loading...</span>
      )}
      {!loading && error && (
        <span>Error! {error.message}</span>
      )}
      {!loading && data && (
        <Box>
          <Box
            {...banner_style}
            bgColor={
              TypeColors[pokemon?.types[0].type.name || 'normal']
            }
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
                <Text {...name_style}>
                  {pokemon?.name}
                </Text>
                <Box {...type_box}>
                  {pokemon?.types.map((type) => (
                    <Badge
                      {...bedge_type}
                      bgColor={TypeColors[type.type.name]}
                      key={type.type.name}
                      variant="solid"
                    >
                      {type.type.name}
                    </Badge>
                  ))}
                </Box>
                <StatGroup {...heigt_box}>
                  <Stat position="initial">
                    <StatLabel>Height</StatLabel>
                    <StatNumber>{`${pokemon?.height}"`}</StatNumber>
                  </Stat>
                  <Stat position="initial">
                    <StatLabel>Weight</StatLabel>
                    <StatNumber>{`${pokemon?.weight}lbs`}</StatNumber>
                  </Stat>
                </StatGroup>
              </Box>
              <Box
                mt={5}
                ml={{ md: 10 }}
                width={{ md: '70%' }}
              >
                Pokemon Ability
              </Box>
            </Box>
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
  padding: '0rem 1rem 3rem 1rem',
};

const left_box : ChakraProps = {
  marginTop: '-11rem',
};

const image_box: ChakraProps = {
  display: 'flex',
  justifyContent: 'center',
};

const name_style: ChakraProps = {
  textAlign: 'center',
  textTransform: 'capitalize',
  fontWeight: 'bold',
  marginTop: '-2.5rem',
  fontSize: '32px',
};

const type_box: ChakraProps = {
  textAlign: 'center',
  marginBottom: '10px',
};

const bedge_type: ChakraProps = {
  margin: '5px',
  textTransform: 'capitalize',
};

const heigt_box: ChakraProps = {
  border: '1px solid rgba(0,0,0,.125)',
  borderRadius: '5px',
  padding: '20px',
  textAlign: 'center',
};
