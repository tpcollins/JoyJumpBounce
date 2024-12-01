import Layout from "../src/layouts/Layout";
import Header1 from "../src/layouts/header/Header1";
import Footer from "../src/layouts/Footer";
import About from "./about";
import { useEffect } from "react";
import { activeNavMenu } from "../src/utils";
import { footerData } from "../src/Data/data";

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

  // Chrome Detection
  useEffect(() => {
    const isChrome =
        /Chrome/.test(navigator.userAgent) &&
        /Google Inc/.test(navigator.vendor) &&
        !/OPR|Opera/.test(navigator.userAgent);

    if (isChrome) {
        document.body.classList.add('chrome-browser');
        console.log('Chrome detected');
    }
  }, []);

  // Safari Detection
  useEffect(() => {
    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        document.body.classList.add('safari-browser');
        console.log('Safari detected');
    } else {
        console.log('Not Safari');
    }
  }, []);

  return(
    <Layout noFooter noHeader bodyClass={"main"}>

      <Header1 />
      
      <About />
      
      <Footer footerData={footerData}/>

    </Layout>
  );
};

export default AboutUs;