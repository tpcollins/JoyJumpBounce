const About = () => {

  return (
    <div className="container">
      <div className="about-container">
        <section className="about-section">
          <section className="about-section-inner">
            <h1>About Us
              <img 
                src="assets/images/logo/JJLogoAbUs.png"
                alt="textImg"
              />
            </h1>
          
            <p>
              Joyjump is owned by two friends, Noah Marler and Johnathan May. With a shared passion for bringing joy to communities and making every event memorable, we set out on this exciting journey to provide 
              top-notch inflatable rentals. 
            </p>

            <br/>

            <p>
              Our goal is simple: to make your celebrations unforgettable. Whether it's a birthday 
              party, school event, or family reunion, we pride ourselves on delivering high-quality, clean, and safe inflatables.
            </p>

            <br/>

            <p>
              As a small business, we are dedicated to providing personal and reliable service to each of our customers, ensuring that every event is filled with laughter and excitement.
            </p>

            <br/>

            <p
            style={{
              paddingBottom: '10px'
            }}
            >
              Thank you for choosing Joyjump – we can’t wait to be part of your next celebration! Roll Tide!
            </p>

            <div id="ab-btn">
              <button
              className="text-center w-max rounded-full border-2 border-orange-600 bg-stone-900 px-4 py-2 text-sm font-large text-white shadow-md outline-none hover:bg-stone-800 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-stone-800"
              >
                  <a
                  href="/contactus"
                  style={{color: "white"}}
                  target="_blank"
                  >
                    Contact Us Today!
                  </a>
              </button>
            </div>

          </section>
        </section>
      </div>
    </div>
  );
};
export default About;
