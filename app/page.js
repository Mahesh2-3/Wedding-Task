"use client"
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MockData from "./MockData.json";
import Image from "next/image";
import "./page.css"

export default function Home() {
  const router = useRouter()
  const [Data, setData] = useState([]);

  useEffect(() => {
    // Add stars to the mock data
    const updatedData = MockData.map((item) => ({
      ...item,
      stars: generateStars(item.rating),
    }));
    //sort the data by rating
    updatedData.sort((a, b) => b.rating - a.rating);
    //set the data
    setData(updatedData);
  }, []);

  // Function to generate stars dynamically
  const generateStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating); // Assuming 5 stars max
  };

  function AnimatedSection({ children, duration = 1, y, x, triggerOnce = true }) {
    const { ref, inView } = useInView({ triggerOnce: triggerOnce, threshold: 0.2 });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: x, y: y }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: x, y: y }}
        transition={{ duration: duration, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
  }


  const Navigation = () => {
    router.push("/Contact")
  }

  return (
    <>
      <div className=" font-[family-name:var(--font-geist-sans)]">
        <div className="sm:flex block md:justify-between justify-center h-[84vh] pb-10 m-0">
          <div className="hidden md:block">
            <AnimatedSection duration={1} y={-100} x={0} triggerOnce={true}>
              <Image width={160} height={640} className="h-[640px] w-[160px] " src="/left-leaf.png" alt="" />
            </AnimatedSection>
          </div>
          <div className="md:w-[60vw] w-full h-full mt-10 text-center flex gap-4 flex-col justify-evenly items-center text-[#c4811b]">
            <div className="flex flex-col lg:flex-row items-center justify-center">
              <h1 className="text-4xl px-4 border-b-2 py-1 w-fit text-[#869000] font-bold">Shaadi Vibes </h1>
              <span className="font-normal text-xl text-[#869000]">- A Perfect Wedding Organizer</span>
            </div>
            <span className="px-3">Welcome to ShadiVibes – Your Dream Wedding Partner!
              We bring your dream wedding to life with expert planning, stunning decor, top photographers, and personalized bridal services. Let’s make your big day unforgettable!</span>
            <AnimatedSection duration={1} y={0} x={0} triggerOnce={true}>
              <Image priority width={512} height={265} className="scale-100  relative md:scale-125" src="/wedding.png" alt="" />
            </AnimatedSection>



          </div>
          <div className="hidden md:block">
            <AnimatedSection duration={1} y={-100} x={0} triggerOnce={true}>
              <Image width={160} height={640} className="h-[640px]  w-[160px] " src="/right-leaf.png" alt="" />
            </AnimatedSection>
          </div>
        </div>
        <div className="flex gap-2 justify-end w-full items-center">
          <span className="lg:text-4xl text-2xl text-amber-500">Reviews</span>
          <img className="lg:w-[80px] w-[40px] lg:h-[80px] h-[40px]" src="./down-gif.gif" alt="" />
        </div>
        <div className='bg-[#F5F5DC] flex flex-col items-center justify-center py-10'>
          <h1 className='text-4xl w-fit  text-center pt-9 px-4 text-[#c4811b] font-bold border-b'>Reviews</h1>
          <div className='flex w-[80%] items-center  flex-wrap gap-10 justify-center mt-10'>
            {Data.map((item, index) => {
              return (
                <AnimatedSection key={index} duration={1} y={0} x={index % 2 === 0 ? -100 : 100} triggerOnce={true}>
                  <div key={index} className='cards hover:scale-[1.05] transition-all ease-in-out duration-300 cursor-pointer shadow-[0px_0px_20px_0px_#878383] hover:shadow-[0px_0px_0px_0px_#878383] bg-white p-6 rounded-lg sm:h-[200px] sm:w-[500px] w-[450px] h-[180px] flex flex-col items-center justify-center sm:gap-4 gap-1'>
                    <div className='item-service text-2xl font-bold text-amber-400'>{item.service}</div>
                    <div className='flex flex-col w-full px-3 text-black items-left justify-center gap-2'>
                      <div className='flex items-center gap-2'>
                        <span className='text-xl font-bold'>{item.reviewer} - </span>
                        <span className='stars text-yellow-400'>{item.stars}</span>
                      </div>
                      <p className='text-left text-gray-700'>{item.comment}</p>
                      <p className='text-left text-gray-700'><strong>Review Date: </strong>{item.date} </p>
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
        <button className="mx-auto button">
          <div className="outline"></div>
          <div className="state state--default">
            <div className="icon">
              <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                <g filter="url(#shadow)">
                <path
                    d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63ZM7.63988 7.03001C4.85988 7.96001 3.86988 9.06001 3.86988 9.78001C3.86988 10.5 4.85988 11.6 7.63988 12.52L10.1599 13.36C10.3799 13.43 10.5599 13.61 10.6299 13.83L11.4699 16.35C12.3899 19.13 13.4999 20.12 14.2199 20.12C14.9399 20.12 16.0399 19.13 16.9699 16.35L19.7999 7.86001C20.3099 6.32001 20.2199 5.06001 19.5699 4.41001C18.9199 3.76001 17.6599 3.68001 16.1299 4.19001L7.63988 7.03001Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18C9.29005 13.89 9.29005 13.41 9.58005 13.12L13.16 9.53C13.45 9.24 13.93 9.24 14.22 9.53C14.51 9.82 14.51 10.3 14.22 10.59L10.64 14.18C10.5 14.33 10.3 14.4 10.11 14.4Z"
                    fill="currentColor"
                  ></path>
                  <defs>
                    <filter id="shadow">
                      <feDropShadow dx="0" dy="1" stdDeviation="0.6" floodOpacity="0.5"></feDropShadow>
                    </filter>
                  </defs>
                </g>
              </svg>
            </div>
            <p>
              <span style={{ "--i": 0 }}>G</span>
              <span style={{ "--i": 1 }}>e</span>
              <span style={{ "--i": 2 }}>t</span>
              <span style={{ "--i": 3 }}></span>
              <span style={{ "--i": 4 }}>S</span>
              <span style={{ "--i": 5 }}>t</span>
              <span style={{ "--i": 6 }}>a</span>
              <span style={{ "--i": 7 }}>r</span>
              <span style={{ "--i": 8 }}>t</span>
              <span style={{ "--i": 9 }}>e</span>
              <span style={{ "--i": 10 }}>d</span>
            </p>
          </div>
          <div className="state state--sent">
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                strokeWidth="0.5px"
                stroke="black"
              >
                <g style={{ filter: "url(#shadow)" }}>
                  <path
                    fill="currentColor"
                    d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
        </button>
      </div>
    </>
  );
}
