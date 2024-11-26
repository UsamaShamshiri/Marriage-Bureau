
import React, { useEffect, useRef, useState } from 'react';

const Why = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger animation when 10% of the element is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`container mx-auto text-center bg-stone-200 py-10 my-10 ${
        isVisible ? 'animate-fadeInUp' : ''
      }`}
    >
      <h1 className="text-4xl font-serif " id="why">
        Why Us
      </h1>
      <div className="flex flex-wrap justify-around mt-10">
        <div className="max-w-md p-4">
          <h2 className="text-2xl font-bold font-serif">Privacy</h2>
          <p className="mt-4 text-green-800">
            Safety and privacy of the member is top priority. Being a certified matchmaking portal we let you decide who to give your contact information to.
          </p>
        </div>
        <div className="max-w-md p-4">
          <h2 className="text-2xl  font-serif font-bold">Large Database</h2>
          <p className="mt-4 text-green-800">
            We have a wide choice from all the communities and a large NRI database so you can find your life partner with the assistance of the best matchmaking service.
          </p>
        </div>
        <div className="max-w-md p-4">
          <h2 className="text-2xl font-serif font-bold">Authentic, Verified Profiles</h2>
          <p className="mt-4 text-green-800">
            We prioritize trust and credibility. Every profile on our platform undergoes a thorough verification process to ensure you connect with genuine individuals.
          </p>
        </div>
        <div className="max-w-md p-4">
          <h2 className="text-2xl font-serif font-bold">Support</h2>
          <p className="mt-4 text-green-800">
            With years of experience, our team of matchmakers and relationship advisors is here to guide you through every stage of your search. Whether you need help refining your profile or advice on connecting with potential matches, we've got you covered.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Why;
