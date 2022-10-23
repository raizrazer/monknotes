import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='navbar flex justify-center p-2'>
      <div className='logo'>
        <Link href='/'><a><h1 className='logo-text text-brand-biggest font-bold p-2'>MonkNotes</h1></a></Link> 
      </div>
    </nav>
  )
}

export default Navbar