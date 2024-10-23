import Layout from "../src/layouts/Layout";
import Header1 from "../src/layouts/header/Header1";
import Footer from "../src/layouts/Footer";
import About from "./about";
import { useEffect } from "react";

const AboutUs = () => {

  useEffect(() => {
    document.body.classList.add('abus-body');
    
    return () => {
      document.body.classList.remove('abus-body');
    };
  }, []);

  return(
    <Layout noFooter noHeader bodyClass={"main"}>

      <Header1 />
      
      <About />
      
      <Footer />

    </Layout>
  );
};

export default AboutUs;