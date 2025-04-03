"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import MockData from './MockData.json'

const page = () => {
    const [data, setData] = useState(MockData)

    function AnimatedSection({ children, duration = 1, y, x, triggerOnce = true }) {
        const { ref, inView } = useInView({ triggerOnce: triggerOnce, threshold: 0.2 });

        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, x: x, y: y }}
                animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: x, y: y }}
                transition={{ duration: duration, ease: "easeOut" }}
                className="w-full flex justify-center items-center"
            >
                {children}
            </motion.div>
        );
    }



    return (
        <>
            <div className='flex justify-center items-center flex-col w-fit overflow-hidden gap-10'>
                <h1 className='text-4xl  mx-auto w-fit text-center pt-9 px-4 text-[#c4811b] font-bold border-b'>About Us</h1>
                <div className='md:w-[60%] w-full px-7 text-left'>
                    <strong className='sm:text-2xl text-lg text-amber-400'>🎉 Welcome to ShadiVibes 💍</strong>
                    <ul className="list-disc">
                        <li>✨ Your perfect wedding partner</li>
                        <li>📋 Comprehensive wedding planning services</li>
                        <li>🏰 Venue selection, expert decorators & photographers</li>
                        <li>👰‍♀️ Customized bridal services</li>
                        <li>💖 Making your dream wedding a reality</li>
                    </ul>
                </div>



                <div className='flex flex-col items-center justify-center  gap-10 mt-10'>
                    {data.map((item, index) => {
                        return (
                            <AnimatedSection key={index} duration={1} y={0} x={index % 2 == 0 ? -200 : 200} triggerOnce={true}>
                                <div key={index} className='hover:scale-[1.05] transition-all ease-in-out duration-300 cursor-pointer shadow-[0px_0px_20px_0px_#878383] hover:shadow-[0px_0px_0px_0px_#878383] bg-white p-6 rounded-lg md:h-[200px] sm:h-[300px] h-[350px] py-3 lg:w-[850px] md:w-[750px] w-[90%] flex flex-col md:flex-row items-center md:justify-around justify-center gap-8'>
                                    <div className='text-2xl md:w-[30%] w-fit font-bold text-center text-amber-400'>{item.title}</div>
                                    <div className='flex md:w-[70%] w-fit flex-col px-3 text-black items-left justify-center gap-2'>
                                        <span className='text-sm'> ♦ {item.description}</span>
                                        <em className='text-sm'><strong>Review: </strong>{item.message}</em>
                                    </div>
                                </div>
                            </AnimatedSection>
                        )
                    })}
                </div>
                <div className='text-2xl px-2 border-b w-fit font-bold mt-10'>💖 Why Choose Us?</div>
                <ul className='flex flex-col items-start justify-center px-3 gap-4'>
                    <li className='hover:scale-110 w-fit transition-all ease-in-out duration-300 cursor-pointer'><strong>✔ Expert Team:</strong> Years of experience in making weddings magical
                    </li>
                    <li className='hover:scale-110 w-fit transition-all ease-in-out duration-300 cursor-pointer'><strong>✔ Personalized Services:</strong> Tailored to fit your unique style and preferences
                    </li>
                    <li className='hover:scale-110 w-fit transition-all ease-in-out duration-300 cursor-pointer'><strong>✔ Quality & Perfection:</strong> We ensure every detail is flawless
                    </li>
                    <li className='hover:scale-110 w-fit transition-all ease-in-out duration-300 cursor-pointer'><strong>✔ Memorable Experiences:</strong> Creating beautiful memories that last a lifetime</li>
                </ul>
            </div>
        </>
    )
}

export default page