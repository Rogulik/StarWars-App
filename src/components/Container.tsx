import React from 'react'
import Navbar from './Navbar'
import Subnav from './Subnav'

type Props= {
    children: React.ReactNode
}

const Container = ({ children }: Props) => {
    return (
        <div>
            <Navbar />
            <Subnav />
            {children}
        </div>
    )
}

export default Container
