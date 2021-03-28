import { useEffect, useState } from 'react';

import { Button } from './components/Button';
import { MovieCard } from './components/MovieCard';

// import { SideBar } from './components/SideBar';
// import { Content } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';

import './styles/content.scss';
import {IGenre, Movie} from './interfaces'
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';


export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<IGenre[]>([]);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<IGenre>({} as IGenre);

  useEffect(() => {
    api.get<IGenre[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<Movie[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<IGenre>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);


  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar genres={genres} selectedGenreId={selectedGenreId} handleClickButton={handleClickButton}/>
      <Content movies={movies} selectedGenre={selectedGenre}/>
      
    </div>
  )
}