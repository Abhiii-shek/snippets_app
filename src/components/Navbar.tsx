import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between item-center'>
       <Link href={"/"}>
       
        <h1>
            
            Snippets App
            </h1>
       </Link>
            <h2>Hello , User</h2>
            </div>
  )
}

export default Navbar