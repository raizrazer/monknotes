import React from 'react'
import Link from 'next/link'

const Test = () => {
  return (
    <>
    <nav className='navbar flex justify-center'>
      <div className='logo'>
        <Link href='/'><h1 className='logo-text text-3xl font-bold'>MonkNotes</h1></Link> 
      </div>
    </nav>
    <div>Test</div>
    </>
  )
}

export default Test