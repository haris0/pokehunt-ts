import {
  Box,
  // Button,
  Image,
  Flex,
  ChakraProps,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Pokeball from 'assets/Pokeball.png';

type props = {
  count: number
}

const CollectionButton = ({ count }: props) => (
  <Flex {...footer_flex} justify="space-between" wrap="wrap">
    <Box margin="auto">
      <Flex align="center">
        <Link to="/collection">
          <button type="button" style={{ ...pokemon_button }}>
            <Image alt="Poke Ball" src={Pokeball} height="30px" width="30px" />
            <b style={{ margin: '0 0.7rem' }}>My Pokemon</b>
            <Box {...count_box}>
              <b>{count}</b>
            </Box>
          </button>
          {/* <Button
            {...pokemon_button}
            colorScheme="teal"
            leftIcon={<Image alt="Poke Ball" src={Pokeball} height="23px" width="23px" />}
          >
            My Pokemon
            <Box {...count_box}>
              {count}
            </Box>
          </Button> */}
        </Link>
      </Flex>
    </Box>
  </Flex>

);

export default CollectionButton;

const footer_flex: ChakraProps = {
  zIndex: '99',
  overflow: 'hidden',
  position: 'fixed',
  bottom: '0',
  width: '100%',
  left: '0',
  padding: '1rem 0',
};

const pokemon_button = {
  backgroundColor: '#57cca7',
  height: '3.4rem',
  width: '13rem',
  borderRadius: '3.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const count_box: ChakraProps = {
  lineHeight: '1.6rem',
  width: '30px',
  height: '30px',
  bgColor: '#2E3131',
  borderRadius: 'full',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
