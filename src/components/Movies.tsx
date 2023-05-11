import { ListOfMoviesProps } from '../interfaces/search-engine';

const ListOfMovies = ({ movies }: ListOfMoviesProps) => {
	return (
		<ul className="movies">
			{movies?.map(movie => (
				<li className="movie" key={movie.id}>
					<h3>{movie.title}</h3>
					<p>{movie.year}</p>
					<img src={movie.poster} alt={movie.title} />
				</li>
			))}
		</ul>
	);
};

const NoMovieResults = () => {
	return <p>No se encontraron películas en esta búsqueda</p>;
};

export const Movies = ({ movies }: ListOfMoviesProps) => {
	const hasMovies = movies && movies.length > 0;

	return hasMovies ? <ListOfMovies movies={movies} /> : <NoMovieResults />;
};
