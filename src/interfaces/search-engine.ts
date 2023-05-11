export type SearchTuple = [string, (newValue: string) => void, string | null];

export interface MovieAPIResponse {
	Search: {
		imdbID: string;
		Title: string;
		Year: string;
		Poster: string;
	}[];
}

export interface Movie {
	id: string;
	title: string;
	year: string;
	poster: string;
}

export interface moviesProp {
	search: string;
}

export interface UseMoviesResult {
	movies: Movie[] | null;
	getMovies: (search: searchProp) => void;
	loading: boolean;
}

export interface useMoviesProp {
	search: string;
	sort: boolean;
}

export interface searchProp {
	search: string;
}

export interface ListOfMoviesProps {
	movies: Movie[] | null;
}
