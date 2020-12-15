import React from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import Container from '../../../components/Container'

const fetchFilm = async (key:any) => {
    const res = await fetch(`http://swapi.dev/api/films/${key.queryKey[1]}`);
    return res.json();
}

const Film = () => {
    const router = useRouter()
    const { id } = router.query
    const{data,status} = useQuery(['films', id], fetchFilm)

    console.log(data)
    
    return (
        <>
        {status === 'loading' && (
            <Container>
              <h3 className='mt-4 text-2xl text-center text-white'>Loading...</h3>
             </Container>
          )}
    
          {status === 'error' && (
            <div>Error fetching data</div>
          )}

          {status === 'success' && (
            <Container>
                <main className="flex flex-col items-center px-48 mt-12 text-white">
                    <h2 className='text-4xl'>{data.title}</h2>
                    <h3 className='text-2xl'>{data.director}</h3>
                    <h4>{data.release_date}</h4>
                    <p className='mt-4 leading-8 tracking-wider text-yellow-300'>{data.opening_crawl}</p>
                </main>
            </Container>
          )}
        </>
    )   
}

export default Film
