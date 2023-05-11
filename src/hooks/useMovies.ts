import { useState, useRef, useMemo, useCallback } from 'react';
import { searchMovies } from '../services/movies';
import {
	Movie,
	UseMoviesResult,
	searchProp,
	useMoviesProp,
} from '../interfaces/search-engine';

export const useMovies = ({ search, sort }: useMoviesProp): UseMoviesResult => {
	const [movies, setMovies] = useState<Movie[] | null>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const previousSearch = useRef(search);

	const getMovies = useCallback(async ({ search }: searchProp) => {
		if (search === previousSearch.current) return;
		try {
			setLoading(true);
			setError(null);
			previousSearch.current = search;
			const newMovies = await searchMovies({ search });
			setMovies(newMovies);
		} catch (e: any) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	}, []);

	const sortedMovies = useMemo(
		() =>
			sort && movies
				? [...movies].sort((a: Movie, b: Movie) =>
						a.title.localeCompare(b.title)
				  )
				: movies,
		[sort, movies]
	);

	return { movies: sortedMovies, getMovies, loading };
};
