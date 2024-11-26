import React, { useState } from 'react';
import logo from '../images/logo.jpeg'; 
import { Link } from 'react-router-dom';
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="w-full bg-white p-2" >
      <div className=" flex items-center justify-between p-4 max-w-screen-lg mx-auto">
       
        <div className="flex items-center space-x-4">
          <img className="border-white rounded-lg" src={logo} width="60"  alt="logo" />
          <div className="text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-bold text-black">Mughal Marriage Bureau</h1>
            <p className="text-sm md:text-lg text-gray-900">Find your perfect match</p>
          </div>
        </div>

        {/* Hamburger Menu Icon */}
        <div className="md:hidden flex items-center" onClick={toggleMenu}>
          <div className="relative w-8 h-8 flex flex-col justify-center items-center cursor-pointer">
            {!isOpen && (
              <div className="flex flex-col space-y-1">
                <span className="block w-6 h-1 bg-black"></span>
                <span className="block w-6 h-1 bg-black"></span>
                <span className="block w-6 h-1 bg-black"></span>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-6">
          <ul className="flex flex-row space-x-6">
            <li><Link to='/' className="text-gray-800 p-2 rounded-sm hover:bg-green-700 hover:text-white text-base md:text-lg" >Home</Link></li>
            <li><Link to='/about' className="text-gray-800 p-2 rounded-sm hover:bg-green-700 hover:text-white text-base md:text-lg" >About</Link></li>
            <li><Link  to='/contact' className="text-gray-800 p-2 rounded-sm hover:bg-green-700 hover:text-white text-base md:text-lg" >Contact Us</Link></li>
            <li><Link to='/why' className="text-gray-800 p-2 rounded-sm hover:bg-green-700 hover:text-white text-base md:text-lg" >Why Us</Link></li>
          </ul>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`fixed top-0 right-0 w-full h-full  bg-green-900  shadow-md z-50 transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
       <div className='mt-24'>
        <div className="flex justify-end p-6">
          <div className="w-8 h-8 flex items-center justify-center cursor-pointer" onClick={toggleMenu}>
            {isOpen && (
              <div className="relative w-6 h-6">
                <span className="block w-6 h-1 bg-white absolute top-2.5 left-0 transform rotate-45"></span>
                <span className="block w-6 h-1 bg-white absolute top-2.5 left-0 transform -rotate-45"></span>
              </div>
            )}
          </div>
        </div>
        <nav className="flex flex-col items-center  space-y-4 ">
          <ul className="flex flex-col items-center space-y-4">
            <li><Link to='/' className="block py-2 px-4  rounded text-base" onClick={toggleMenu}>Home</Link></li>
            <li><Link to='about' className="block py-2 px-4   rounded text-base"  onClick={toggleMenu}>About</Link></li>
            <li><Link to='contact' className="block py-2 px-4  rounded text-base" onClick={toggleMenu} >Contact Us</Link></li>
            <li><Link to='why' className="block py-2 px-4   rounded text-base"  onClick={toggleMenu}>Why Us</Link></li>
            <li><Link to='login' className="block py-2 px-4  rounded text-base" onClick={toggleMenu}>LogIn</Link></li>
          </ul>
        </nav>
      </div>
      </div>
    </header>
  );
};

export default Header;
