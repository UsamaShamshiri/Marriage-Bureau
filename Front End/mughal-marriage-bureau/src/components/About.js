import Aboutus from '../images/C.jpg'
function About() {
  return (
    <>

      <div className="container mx-auto text-center mt-10 p-8 ">
        <h1 className="text-4xl font-serif " id="about">About Us</h1>
        <img src={Aboutus} alt="About Us" className="mx-auto mt-10 rounded-2xl" width="30%" />
        <p className="mx-auto mt-4 max-w-4xl text-green-800"> 
          We, Purpose Matrimonial, situated at Chishtian realize that marriage,
          being one of the most important and sacred events in every culture,
          is not only the union of two individual souls but also of two families.
          We are the pioneer and prominent matrimonial services provider of efficient and reliable matrimonial services including match making,
          personal consultancy and other related allied services to individuals living in the country.
          Our company works diligently to create a rich and enormous database of high profile clients.
          Our teams are well versed in the dynamics of the marriage system of every community.
          We have dedicated teams that work meticulously in order to cater to the requirements of various categories of client
        </p>
      </div>



    </>
  );
}

export default About;
