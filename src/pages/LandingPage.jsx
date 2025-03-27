import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
    return (
        <>
            <div className='h-[540px] md:h-[630px] max-w-[375px] relative px-5 py-5 mx-auto bg-[#F7F8F9] '>
                 <div className='flex flex-col absolute bottom-5 z-10 gap-2'>
                    <h2 className='font-bold text-2xl'>
                        Welcome to PopX
                    </h2>
                    <p className='w-[75%] text-gray-400 font-semibold text-'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>

                    <div className="buttons w-[95%] flex flex-col gap-3 py-4">
                      <Link to='/signup' className='bg-[#6C25FF] hover:bg-[#6C25FF] text-white font-semibold text-center py-3 rounded-lg cursor-pointer'>
                      Create Account
                      </Link>
                      <Link to='/login' className='bg-[#6C25FF4B] hover:bg-[#6C25FF4B] font-semibold text-center text-16px py-3 rounded-lg cursor-pointer'>
                      Already Registered? Login
                      </Link>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Home
