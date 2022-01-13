import { useParams } from 'react-router-dom';

const DetailPage = () => {
  const params = useParams();
  console.log(params);

  return (
    <div>
      Detail Pokemon {params.name}
    </div>
  );
};

export default DetailPage;
