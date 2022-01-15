import {
  Box, ChakraProps, Image,
} from '@chakra-ui/react';
import pokeball from 'assets/Pokeball.png';
import pokeEgg from 'assets/PokeEgg.png';

type props = {
  theme: 'dark' | 'light';
  name: string;
  number: number;
  imageUrl: string;
  owned: number;
}

const CardPokemon = ({
  theme,
  number,
  name,
  imageUrl,
  owned,
}: props) => (
  <Box
    {...card_style}
  >
    <Box {...image_box}>
      <Box {...number_style}>
        <b>#{String(number).padStart(3, '0')}</b>
      </Box>
      <Image
        src={imageUrl}
        fallbackSrc={pokeEgg}
        width="90%"
        alt={name}
      />
    </Box>
    <Box {...owned_style} bgColor={`${theme}.bg`}>
      Owned {owned}
    </Box>
    <Box p="20px 0px">
      <Box
        mt="1"
        fontWeight="semibold"
        textAlign="center"
        textTransform="capitalize"
        as="h4"
        lineHeight="tight"
        isTruncated
      >
        {name}
      </Box>
    </Box>
  </Box>
);

export default CardPokemon;

const card_style: ChakraProps = {
  maxW: 'sm',
  width: '10rem',
  height: '14.5rem',
  border: '1px solid rgba(0,0,0,.125)',
  borderRadius: '20px',
  overflow: 'hidden',
  boxShadow: '7px 7px 0 #56cca7',
  transition: 'all 0.25s',
  position: 'relative',
  _hover: {
    boxShadow: 'none',
  },
};

const number_style: ChakraProps = {
  position: 'absolute',
  top: '0.5rem',
  right: '0.7rem',
};

const image_box: ChakraProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,.3)',
  backgroundSize: '70%',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url(${pokeball})`,
  borderRadius: '20px',
  padding: '8% 0',
};

const owned_style: ChakraProps = {
  position: 'absolute',
  top: '9.5rem',
  left: '0rem',
  border: '0.2rem solid #56cca7',
  borderLeft: 'none',
  height: '1.8rem',
  width: '5.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderTopRightRadius: '10px',
  borderBottomRightRadius: '10px',
  fontSize: '14px',
};
