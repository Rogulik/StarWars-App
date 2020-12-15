import Link from 'next/link';
import React, {useState, useEffect, ChangeEvent} from 'react'
import { useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase'
import { useQuery } from 'react-query';
import Container from '../../components/Container'
import { HeartOutline, Heart } from 'heroicons-react'

const fetchFilms = async () => {
    const res = await fetch(`http://swapi.dev/api/films/`);
    return res.json();
}

const Films:React.FC = () => {
    const { data, status } = useQuery('films', fetchFilms);
    const [movies,setMovies] = useState([])
    const firestore = useFirestore()
    useFirestoreConnect([
      {collection: 'favourites'}
    ])
    const favourites = useSelector((state:any) => state.firestore.ordered.favourites)

    useEffect(() => {
      if(status === 'success'){
        setMovies(data.results)
      }
    },[status])

    const onChangeCheckDirector = (e:any) => {
      if(e.target.value === 'all'){
        setMovies(data.results)
        return
      }
      setMovies(data.results.filter((movie:any) => movie.director === e.target.value))
    }

    const addTofavourite = (favourite:any) => {
      return firestore.collection('favourites').add(favourite)
    }
 
  return (
    <>
      {status === 'loading' && (
        <Container>
          <h3 className='mt-4 text-2xl text-center text-white'>Loading...</h3>
         </Container>
      )}

      {status === 'error' && (
        <Container>
          <h3 className='mt-4 text-2xl text-center text-white'>Error fetching data</h3>
       </Container>
      )}

      { status === 'success' && (
          <Container>
            <div className='flex justify-evenly'>
              <div className='flex flex-col items-center mt-4'>
                <label htmlFor='filter' className='text-white'>Filter</label>
                <select id='filter' onChange={onChangeCheckDirector} className='px-2 py-1'defaultValue='Choose director'>
                  <option value="Choose director" disabled hidden>Choose director</option>
                  {
                    [...new Map(data.results.map((item:any) => [item['director'], item])).values()]
                    .map((movie:any) =>(
                      <option 
                      key={movie.title} 
                      value={movie.director}
                      >
                        {movie.director}
                      </option>
                    ))
                  }
                  <option value="all">All</option>
                </select>
              </div>
            </div>
            <ul className="flex flex-col items-center mt-12 text-white">
                {movies.map(({ title,director,episode_id,release_date },idx) => (
                    <li 
                    key={episode_id}
                    className="p-2 mb-4 text-xl text-center border-4 hover:border-yellow-300 rounded-2xl"
                    >
                        <Link href={`/dashboard/film/${idx + 1}`}>
                            <a className='mr-2 hover:text-yellow-300'>{title}</a>
                        </Link>
                        <button onClick={e => addTofavourite({ title,director,episode_id,release_date })} className='hover:text-yellow-300'>
                            {favourites.map((i:any) => i.episode_id).includes(episode_id) ? (
                              <Heart />
                            ) : (
                              <HeartOutline />
                            )}
                        </button>
                    </li>
                ))}
            </ul>
          </Container>
      )} 
    </>
  );
}

export default Films
