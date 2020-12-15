import React from 'react'
import Container from '../components/Container'
import { useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore, isLoaded } from 'react-redux-firebase'
import {X} from 'heroicons-react'

const Favourites = () => {
    const firestore = useFirestore()
    useFirestoreConnect([
        {collection: 'favourites'}
      ])
      const favourites = useSelector(state => state.firestore.ordered.favourites)
      const onClickDelete = (id) => {
          firestore.collection('favourites').doc(id).delete()
      }
    return (
        <Container>
            <h1 className="mt-8 text-3xl font-extrabold text-center text-yellow-300">
                List of Your fovourite movies
            </h1>
            {!isLoaded(favourites) && (
                <h3 className='mt-4 text-2xl text-center text-white'>Loading...</h3>
            )}
            {isLoaded(favourites) && favourites.length > 0 && (
                 <ul className="flex flex-col items-center mt-4 text-white">
                 {favourites.map(({ title,director,episode_id,release_date,id },idx) => (
                     <li 
                     key={id}
                     className="flex items-center justify-center p-2 mb-4 text-xl text-center text-white border-4 rounded-2xl"
                     >
                        <h3 className='mr-2 font-bold'>{title} | </h3>
                        <p className='mr-2'>Episode: {episode_id} | </p>
                        <p className='mr-2'>Director: {director} | </p>
                        <p className='mr-2'>Release date: {release_date}</p>
                        <button className='hover:text-yellow-300' onClick={e => onClickDelete(id)}>
                            <X />
                        </button>
                     </li>
                 ))}
             </ul>
            )}

        </Container>
    )
}

export default Favourites
