"use client"
import { PiExamFill } from 'react-icons/pi'
import { AiOutlineLaptop } from 'react-icons/ai'
import { FaUserGraduate } from 'react-icons/fa'
import React from 'react'

function Feature() {

    const feature = [
        {
            icon: <AiOutlineLaptop />,
            name: 'Stuty Online'
        },
        {
            icon: <PiExamFill />,
            name: 'Take Exams'
        },
        {
            icon: <FaUserGraduate />,
            name: 'Graduate'
        },
    ]

  return (
    <div className='p-12 max-w-full items-center m-auto'>
        <section className="">
            <h2 className='font-extrabold'>One Of Our Unique Features is The Online Distance Learning</h2>
            <div className="flex gap-10 p-8">
                {
                    feature.map((item, index)=> (
                        <div key={index} className=" p-7 text-center rounded-md shadow-md border-gray-400 m-auto items-center ">
                            <span className='text-4xl flex text-primary m-auto items-center'> {item.icon} </span>
                            <b className='text-xs text-center py-10'>{item.name}</b>
                        </div>
                    ))
                }
            </div>
        </section>

        <section>

        </section>
        
    </div>
  )
}

export default Feature