import React from 'react'
import { Link } from 'react-router-dom'

function Heroe() {
  return (
    <div className="grid-cols-2 grid bg-heroe max-w-full py-8 px-10">
      <div>
        <img src="/images/for-design2.png" alt="" />
      </div>
      <div className=" m-auto items-center pl-10 ">
        <h2 className='capitalize text-3xl font-extrabold pb-10 text-center'>brigther future is guarantee when good education is considered</h2>
        <p className="text-gray-500 text-md leading-2 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore praesentium natus cumque pariatur obcaecati libero repellat tempora commodi. Sequi iure assumenda corrupti explicabo minima deleniti dolorem natus quis laborum? Blanditiis, fuga minima
        </p>
        <button className='font-extrabold border-0 items-center py-2 my-4 hover:bg-opacity-80 text-white m-auto px-4 rounded-sm transition-all duration-500 bg-primary text-sm active:scale-[.8] '><Link to='get-started'>Get Started</Link></button>
      </div>
    </div>
  )
}

export default Heroe