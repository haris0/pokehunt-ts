import {
  Box,
  ChakraProps,
  Container,
  Heading,
  theme,
  Text,
} from '@chakra-ui/react';
import Spinball from 'components/Reuseable/Spinball/Spinball';
import { useCollection } from 'context/CollectionContext';
import { Link } from 'react-router-dom';

const CollectionPage = () => {
  const collection = useCollection();
  console.log(collection);
  return (
    <Box id="Collection">
      <Container {...container_style}>
        <Heading
          as="h4"
          {...heading_style}
          color={`${theme}.text`}
        >
          <Box marginLeft="1rem">
            <Text>My Pokemons</Text>
          </Box>
        </Heading>
        {!!collection.length && (
          <Box>Collection</Box>
        )}
        {!collection.length && (
          <Box textAlign="center" marginTop="2rem">
            <Text {...no_collection_text}>
              You Dont Have any Pokemon!
            </Text>
            <Spinball height="15rem" speed="20" />
            <br />
            <Link to="/">
              <button type="button" style={{ ...back_home }}>
                Catch Wild Pokemon
              </button>
            </Link>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CollectionPage;

const container_style = {
  maxW: '960px',
  padding: '2rem 2rem 6rem',
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

const no_collection_text: ChakraProps = {
  fontWeight: 'bold',
  fontSize: '28px',
  marginBottom: '3rem',
};

const back_home = {
  backgroundColor: '#23CBA7',
  marginTop: '3rem',
  color: 'white',
  height: '3.4rem',
  padding: '0 1rem',
  borderRadius: '3.5rem',
  boxShadow: '0px 0px 7px 1px #000000',
};
