import { useQuery } from '@apollo/client';
import { Box } from '@chakra-ui/react';
import { GET_POKEMON_DETAIL } from 'queries';
import { useParams } from 'react-router-dom';
import { IPokemonDetRes } from 'types';

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
        <div>
          Detail Pokemon {pokemon?.name}
        </div>
      )}
    </Box>
  );
};

export default DetailPage;
