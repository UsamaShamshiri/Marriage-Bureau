import React from "react";
import About from "./About";
import Why from "./Why";
import { Link } from "react-router-dom";
import heropic from '../images/mmb.png'
import heromobile from '../images/mmb(mobile).png'
import Contact from "./Contact";
function Home() {
    return (
        <>
       <div>
             {/* Hero Section */}
             <div className="flex flex-col md:flex-row items-center h-screen justify-stretch p-10 md:p-36 bg-gray-100">
                {/* Text Section */}
                <div className="flex-1 text-center md:text-left md:pr-10 space-y-6">
                    <h1 className="text-3xl md:text-4xl font-bold font-serif transition-all duration-500 ease-in-out transform hover:scale-105">
                        Welcome to Mughal Marriage Bureau!!!
                    </h1>
                    <h2 className="text-green-900 text-lg md:text-xl animate-pulse">
                        Helping You Find Your Perfect Match
                    </h2>
                    
                    <button className="border-2 bg-green-700 text-white p-3 rounded-lg mt-8 text-lg md:text-2xl font-serif hover:bg-green-500 transition-all duration-300 ease-in-out transform hover:scale-105">
                        <Link to='/signup'>Register</Link>
                    </button>
                </div>
                {/* Image Section */}
                <div className="flex-1 flex justify-center md:justify-end">
                    {/* Image for large screens */}
                    <img 
                        src={heropic} 
                        alt="Hero" 
                        className="hidden md:block w-full max-w-md object-cover rounded-lg shadow-lg"
                    />
                    {/* Image for small screens */}
                    <img 
                        src={heromobile}
                        alt="Hero" 
                        className="md:hidden w-full object-cover rounded-lg shadow-lg "
                    />
                </div>
            </div>

            
            <div className="flex justify-center my-10 px-4 md:px-0 ">
                <div className="text-center max-w-4xl space-y-6">
                    <h1 className="text-2xl md:text-3xl font-serif">
                        Looking for a life partner?
                    </h1>
                    <p className="text-green-700 text-sm md:text-lg leading-relaxed">
                        At Mughal Marriage Bureau, we are committed to making your search for a perfect life partner simple,
                        meaningful, and successful. With a personalized approach and a wide range of profiles,
                        we help you connect with individuals who align with your values and preferences.
                        Your perfect partner could be just a click away! Join us today and take the first step toward a life filled with love and companionship.
                    </p>
                    <button className="border-2 bg-green-700 text-white p-3 rounded-lg mt-8  text-lg md:text-2xl font-serif  hover:bg-green-500 transition-all duration-300 ease-in-out transform hover:scale-105">
                        <Link to='/signup'>Register</Link>
                    </button>
                </div>
            </div>

            <About />
            <Why />

            {/* Testimonials Section */}
            <div className="flex justify-center p-10 m-10 bg-gray-200 animate-fade-in">
                <div className="text-center max-w-4xl space-y-10">
                    <h1 className="text-2xl text-blue-900 md:text-3xl font-serif">Hear from Our Happy Couples</h1>
                    <p className="px-4 md:px-24 text-black-100 text-sm md:text-lg leading-relaxed">
                        "We found each other through Mughal Marriage Bureau, and our lives have never been the same. The team was incredibly professional and supportive. Thank you for helping us find love!"
                        – [Client]
                    </p>
                    <p className="px-4 md:px-24 text-black-100 text-sm md:text-lg leading-relaxed">
                        "The personalized service made all the difference. I met my perfect match within just a few months. Couldn’t be happier!"
                        – [Client]
                    </p>
                </div>
            </div>
            <Contact/>
            </div>
        </>
    );
}

export default Home;
