import React from 'react'
import Logo from './Logo'
import Container from '../Container/Container'
import Search from './Search'
import UserMenu from './UserMenu'
import Categories from './Categories'


type Props = {}

function Navbar({ }: Props) {
    return (
        <header className=' flex flex-col gap-2 items-center justify-center'>


            <nav className=' flex flex-row justify-between items-center border-b-2 w-full shadow-sm sm:p-1 md:p-3 xl:p-5'>
                <Logo />
                <Container>
                    <Search />
                </Container>
                <UserMenu />

            </nav>
            
        </header>
    )
}

export default Navbar