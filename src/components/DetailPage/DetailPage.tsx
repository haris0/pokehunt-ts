import { useQuery } from '@apollo/client';
import {
  Box,
  ChakraProps,
  Container,
  Image, Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
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
                <Box
                  {...exp_box}
                  border={`2px solid ${TypeColors[pokemon?.types[0].type.name || 'normal']}`}
                >
                  <Text transform="skew(15deg);">
                    BASE EXP {pokemon?.base_experience}
                  </Text>
                </Box>
                <Text {...name_style}>
                  {pokemon?.name}
                </Text>
                <Box {...type_box}>
                  {pokemon?.types.map((type) => (
                    <Box
                      {...bedge_type}
                      bgColor={TypeColors[type.type.name]}
                      color="light.text"
                      key={type.type.name}
                    >
                      {type.type.name}
                    </Box>
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
                pt={5}
                pl={{ md: 10 }}
                width={{ md: '70%' }}
              >
                <Box>
                  <Text {...sub_title}>Ability:</Text>
                  <Box display="flex">
                    {pokemon?.abilities.map((ability) => (
                      <Box
                        border={`2px solid ${TypeColors[pokemon?.types[0].type.name || 'normal']}`}
                        {...ability_box}
                      >
                        <Text transform="skew(15deg);">
                          {ability.ability.name}
                        </Text>
                      </Box>
                    ))}
                  </Box>
                </Box>
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
  color: 'white',
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

const type_box: ChakraProps = {
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  marginBottom: '10px',
};

const bedge_type: ChakraProps = {
  fontWeight: 'bold',
  width: 'fit-content',
  padding: '0 1rem',
  borderRadius: '1rem',
  margin: '5px',
  textTransform: 'capitalize',
};

const heigt_box: ChakraProps = {
  border: '1px solid rgba(0,0,0,.125)',
  borderRadius: '10px',
  padding: '20px',
  textAlign: 'center',
};

const sub_title: ChakraProps = {
  fontSize: '26px',
  fontWeight: '900',
};

const ability_box: ChakraProps = {
  marginTop: '0.75rem',
  marginRight: '1rem',
  transform: 'skew(-15deg)',
  padding: '0.1rem 1rem',
  textTransform: 'capitalize',
};
