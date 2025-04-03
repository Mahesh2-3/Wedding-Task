"use client"
import React from 'react'
import MockData from "./MockData.json"
import "./Services.css"
import { useState } from 'react'
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer";

const Page = () => {
    const [Data, setData] = useState(MockData)


    function AnimatedSection({ children, duration = 1, y, x, triggerOnce = true }) {
        const { ref, inView } = useInView({ triggerOnce: triggerOnce, threshold: 0.2 });

        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, x: x, y: y }}
                animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: x, y: y }}
                transition={{ duration: duration, ease: "easeOut" }}
                className="inline-block text-center"
            >
                {children}
            </motion.div>
        );
    }

    return (
        <>
            <div className='flex flex-col w-full overflow-x-hidden items-center justify-center py-10 bg-[#F5F5DC]'>
                <h1 className='text-4xl text-[#c4811b] font-bold underline underline-offset-2'>Our Services</h1>
                <div className='flex xl:w-[80%] w-[100%] flex-wrap gap-10 justify-center mt-10'>
                    {Data.map((item, index) => {
                        return (
                            <AnimatedSection key={index} duration={1} y={0} x={index % 2 == 0 ? -100 : 100} triggerOnce={true}>
                                <div key={index} className='cards hover:scale-[1.05] transition-all ease-in-out duration-300 cursor-pointer shadow-[0px_0px_20px_0px_#878383] hover:shadow-[0px_0px_8px_0px_#878383] bg-white p-6 rounded-lg sm:h-[200px] sm:w-[500px] w-[450px] h-[180px] flex flex-col items-center justify-center sm:gap-4 gap-2'>
                                    <div className='sm:text-2xl text-xl font-bold text-amber-400'>{item.title}</div>
                                    <div className='flex flex-col w-full px-3 text-black items-start justify-center gap-2'>
                                        <h2 className='sm:text-xl text-lg font-bold'>{item.type}</h2>
                                        <p className='text-left text-gray-700'>{item.description}</p>
                                        <p className='text-gray-700'><strong>Price: </strong>{item.price}</p>
                                    </div>
                                </div>
                            </AnimatedSection>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Page