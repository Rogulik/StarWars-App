import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'
import React from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase'

const Navbar = () => {
   const {logout} = useAuth()
   const router = useRouter()
   useFirestoreConnect([
    {collection: 'favourites'}
  ])
  const favourites = useSelector(state => state.firestore.ordered.favourites)

   const onClick = async () => {
       try {
        await logout()
        router.push('/')
       } catch (error) {
           console.log(error)
       }
   }
    return (
        <nav className='flex items-center justify-around w-full py-2 border-b-4 border-yellow-300 rounded bg-none'>
            <div>
                <Link href='/dashboard'>
                    <a className="text-3xl font-extrabold text-yellow-300 hover:text-white">
                        STAR WARS
                    </a>
                </Link>
            </div>
            <div className="flex">
                {isLoaded(favourites) && (
                     <button disabled={favourites.length <= 0}>
                     <Link href={favourites.length > 0 ? '/favourites' : ''}>
                         <a className={favourites.length > 0 ?
                             'mr-12 text-xl text-yellow-300 hover:text-white' 
                             : 'mr-12 text-xl text-yellow-800 cursor-not-allowed'}>
                             Favourites:
                             {` `}
                             {favourites.length}
                         </a>
                     </Link>
                 </button>
                )}
                <button 
                className='text-xl text-yellow-300 hover:text-white'
                onClick={onClick}
                >
                    Logout
                </button>
            </div>
            
        </nav>
    )
}

export default Navbar
