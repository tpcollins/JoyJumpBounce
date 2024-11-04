import Layout from "../src/layouts/Layout";
import Header1 from "../src/layouts/header/Header1";
import Footer from "../src/layouts/Footer";
import About from "./about";
import { useEffect } from "react";
import { activeNavMenu } from "../src/utils";

const AboutUs = () => {

  useEffect(() => {
    activeNavMenu();
  }, []);

  useEffect(() => {
    document.body.classList.add('homepage-body');
    
    return () => {
      document.body.classList.remove('homepage-body');
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