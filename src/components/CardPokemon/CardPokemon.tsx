import {
  Box, ChakraProps, Image,
} from '@chakra-ui/react';
import pokeball from '../assets/Pokeball.png';
import pokeEgg from '../assets/PokeEgg.png';

type props = {
  name: string;
  imageUrl: string;
  owned: number;
}

const CardPokemon = ({ name, imageUrl, owned }: props) => (
  <Box
    {...card_style}
    _hover={{ ...card_style_hover }}
  >
    <Box {...image_box}>
      <Image
        src={imageUrl}
        fallbackSrc={pokeEgg}
        width="90%"
        alt={name}
      />
    </Box>
    <Box {...owned_style}>
      Owned {owned}
    </Box>
    <Box p="5">
      <Box
        mt="1"
        fontWeight="semibold"
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
  border: '1px solid rgba(0,0,0,.125)',
  borderRadius: '20px',
  overflow: 'hidden',
  boxShadow: '7px 7px 0 #56cca7',
  transition: 'all 0.25s',
  position: 'relative',
};

const card_style_hover: ChakraProps = {
  boxShadow: 'none',
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
  top: '8.5rem',
  left: '2rem',
  border: '3px solid #56cca7',
  height: '2rem',
  width: '6rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '20px',
};
