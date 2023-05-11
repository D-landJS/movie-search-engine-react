import './App.css';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';
import debounce from 'just-debounce-it';
import { SearchTuple } from './interfaces/search-engine';

const useSearch = (): SearchTuple => {
	const [search, updateSearch] = useState('');
	const [error, setError] = useState<string | null>('');
	const isFirstInput = useRef<boolean>(true);

	useEffect(() => {
		if (isFirstInput.current) {
			isFirstInput.current = search === '';
			return;
		}
		if (search === '') {
			setError('No se puede buscar una peli vacia');
			return;
		}

		if (search?.match(/^\d+$/)) {
			setError('No se puede buscar una peli con un número');
			return;
		}

		if (search && search.length < 3) {
			setError('La búsqueda debe tener al menos 3 caracteres');
			return;
		}
		setError(null);
	}, [search]);

	return [search, updateSearch, error];
};

function App() {
	const [sort, setSort] = useState(false);
	const [search, updateSearch, error] = useSearch();
	const { movies, getMovies, loading } = useMovies({ search, sort });

	const debouncedGetMovies = useCallback(
		debounce((search: string) => {
			console.log('search', search);
			getMovies({ search });
		}, 300),
		[]
	);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (error) return;
		// const fields = new FormData(e.currentTarget);
		// const query = fields.get('query');
		getMovies({ search });
	};

	const handleSort = () => {
		setSort(!sort);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newSearch = e.currentTarget?.value.trimStart();
		updateSearch(newSearch);
		debouncedGetMovies(newSearch);
	};

	return (
		<div className="page">
			<h1>Search Engine React</h1>
			<header>
				<form className="form" onSubmit={handleSubmit}>
					<input
						style={{
							border: '1px solid transparent',
							borderColor: error ? 'red' : 'green',
						}}
						onChange={handleChange}
						name="query"
						value={search}
						type="text"
						placeholder="Avengers, Star Wars, The Matrix..."
					/>
					<input type="checkbox" onChange={handleSort} checked={sort} />
					<button type="submit">Buscar</button>
				</form>
				{error && <p style={{ color: 'red' }}>{error}</p>}
			</header>
			<main>
				{loading ? (
					<div className="wrapper">
						<div className="loading"></div>
					</div>
				) : (
					<Movies movies={movies} />
				)}
			</main>
		</div>
	);
}

export default App;
