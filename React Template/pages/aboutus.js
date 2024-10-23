import Layout from "../src/layouts/Layout";
import Header1 from "../src/layouts/header/Header1";
import Footer from "../src/layouts/Footer";
import About from "./about";

const AboutUs = () => {

  return(
    <Layout noFooter noHeader bodyClass={"main"}>

      <Header1 />
      
      <About />
      
      <Footer />

    </Layout>
  );
};

export default AboutUs;