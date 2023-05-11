import {
	Movie,
	MovieAPIResponse,
	moviesProp,
} from '../interfaces/search-engine';

const OMDBAPI_URL = 'http://www.omdbapi.com/?apikey=1524725e&s=';

export const searchMovies = async ({
	search,
}: moviesProp): Promise<Movie[] | null> => {
	if (search === '') return null;

	try {
		const res = await fetch(`${OMDBAPI_URL}${search}`);
		const json: MovieAPIResponse = await res.json();
		const movies = json.Search;
		return movies?.map(movie => ({
			id: movie.imdbID,
			title: movie.Title,
			year: movie.Year,
			poster: movie.Poster,
		}));
	} catch (e) {
		throw new Error('Error searching movies');
	}
};
