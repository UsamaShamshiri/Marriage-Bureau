// function Contact() {
//     return (
//         <>

//             <div className="container mx-auto text-center bg-white bg-opacity-75 py-10 ">
//                 <h1 className="text-4xl font-serif" id="contact">Contact Us</h1>
//                 <p className="mx-auto mt-4 max-w-4xl">For inquiries, please reach out to us at <a href="mailto:info@mughalmarriagebureau.com"
//                     className="text-blue-500 underline">mughalmarriagebureau.com</a> or call us at 99999999999.</p>
//             </div>

//         </>
//     );
// }

// export default Contact;
import React from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container ml-10 grid grid-cols-1 md:grid-cols-2 gap-8" id='contact'>
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul>
           
            <li className="mb-2">
              <Link
                to="/about"
                className="hover:text-gray-400 transition duration-300 ease-in-out transform hover:scale-105"
              >
               About Us
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/contact"
                className="hover:text-gray-400 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Contact Us
              </Link>
            </li>
            <li className="mb-2">
              <Link
               to="/why"
                className="hover:text-gray-400 transition duration-300 ease-in-out transform hover:scale-105"
              >
              Why Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm">123 Marriage St, Wedding City</p>
          <p className="text-sm">Email: info@marriagebureau.com</p>
          <p className="text-sm">Phone: +123 456 7890</p>
        </div>
      </div>
      <div className="mt-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Marriage Bureau. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Contact;

