import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Subnav = () => {
    const router = useRouter()
    return (
        <div className='flex content-around mt-4 text-lg text-white justify-evenly'>
            <Link href='/dashboard/films'>
                <a 
                className={router.pathname === '/dashboard/films'
                 ? 'px-2 py-1 border-4 border-yellow-300 rounded-2xl font-bold' 
                 : 'px-2 py-1 border-2 border-white rounded-2xl'}>
                Films
                </a>
            </Link>
        </div>
    )
}

export default Subnav
