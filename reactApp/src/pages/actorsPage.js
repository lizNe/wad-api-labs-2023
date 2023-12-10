import { useQuery } from 'react-query';
import { getPopularPeople } from "../api/movies-api"; 

const ActorsPage = () => {
  const { data, error, isLoading, isError } = useQuery('popularPeople', getPopularPeople);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const actors = data.results;
  const actorsDisplay = (
    <div>
      {actors.map(actor => (
        <li key={actor.id}>
          {actor.id}, {actor.name}<br />
        </li>
      ))}
    </div>
  );

  return (
    <div>
      <h2>Popular Actors</h2>
      {actorsDisplay}
    </div>
  );
};

export default ActorsPage;
