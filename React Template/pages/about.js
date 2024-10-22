import Header1 from "../src/layouts/header/Header1";
import Footer from "../src/layouts/Footer";
import { useEffect } from "react";

const About = () => {

  useEffect(() => {
    document.body.classList.add('abus-body');
    
    return () => {
      document.body.classList.remove('abus-body');
    };
  }, []);

  return (
    <>
      <Header1 />

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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sodales, orci pellentesque eleifend congue, nisi libero placerat magna, fermentum congue ex elit eu tortor. 
              </p>
              <br/>
              <p>
              Morbi lorem ante, accumsan nec consequat eget, tincidunt sed lorem. Fusce auctor lectus eget est aliquam laoreet. Nunc luctus blandit pharetra. Etiam et lobortis sapien. Sed interdum fringilla sollicitudin. Donec sollicitudin finibus sem, a iaculis neque interdum maximus. Etiam neque orci, bibendum vel libero in, lobortis pretium est.
              </p>
              <br/>
              <p>
              Morbi placerat lobortis odio. Nunc non efficitur diam. Sed a maximus lacus. Suspendisse vel sagittis libero. Aliquam non luctus velit. Integer quis justo velit. Fusce vitae nisl nibh. Etiam varius nunc at pretium tempus.
              </p>
            </section>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default About;
