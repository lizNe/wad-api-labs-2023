import { useQuery } from 'react-query';
import { getPopularTVShows } from "../api/movies-api";

const SeriesPage = () => {
  const { data, error, isLoading, isError } = useQuery('popularTVShows', getPopularTVShows);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const series = data.results;
  const seriesDisplay = (
    <div>
      {series.map(serie => (
        <li key={serie.id}>
          {serie.id}, {serie.name}<br />
        </li>
      ))}
    </div>
  );

  return (
    <div>
      <h2>TV Series</h2>
      {seriesDisplay}
    </div>
  );
};

export default SeriesPage;
