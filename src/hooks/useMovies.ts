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
	const previousSearch = useRef(search);

	const getMovies = useCallback(async ({ search }: searchProp) => {
		if (search === previousSearch.current) return;
		try {
			setLoading(true);
			previousSearch.current = search;
			const newMovies = await searchMovies({ search });
			setMovies(newMovies);
		} catch (e: any) {
			console.log(e);
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
