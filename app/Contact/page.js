"use client"
import React from 'react'
import { set, useForm } from "react-hook-form"

const Page = () => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res => res.json())
            .then(data => {
                if (data.success) {
                    document.querySelector('.message').innerHTML = "Your message has been sent successfully"
                    document.querySelector('.message').style.color = "green"
                } else {
                    document.querySelector('.message').innerHTML = "Something went wrong, please try again later"
                    document.querySelector('.message').style.color = "red"
                }
            })
            .catch(err => console.error("IError:", err));


        setTimeout(() => {
            document.querySelector('.message').innerHTML = ""
            document.querySelector('.message').style.color = "black"
        reset()
        }
            , 2000)
        
    }


   
    //form takes name email message with validation

    return (
        <>
            <div className='flex bg-[#F5F5DC] h-[78.1vh] w-full flex-col items-center justify-center py-10 '>
                <h1 className='text-4xl mb-10 px-5 font-bold border-b'>Contact Us</h1>
                <form className='flex md:w-[700px] w-[95%]  flex-col  gap-4' onSubmit={handleSubmit(onSubmit)}>
                    <input className='bg-transparent w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder="Name" {...register("name", { required: "This field is required", })} />
                    {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
                    <input className='bg-transparent w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder="Email" {...register("email", { required: "This field is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email address", }, })} />
                    {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
                    <textarea className='bg-transparent w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder="Message" {...register("message", { required: "This field is required", })} />
                    {errors.message && <span className='text-red-600'>{errors.message.message}</span>}


                    <input className='submit cursor-pointer w-full px-4 py-2 text-xl text-white rounded-md focus:outline-none bg-blue-500' type="submit" />
                    <span className='sm:text-xl text-lg message h-[30px]'></span>
                </form>
            </div>
        </>
    )
}

export default Page