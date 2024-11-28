import Footer from "../src/layouts/Footer";
import Header1 from "../src/layouts/header/Header1";
import Layout from "../src/layouts/Layout";
import { activeNavMenu } from "../src/utils";
import { useEffect } from "react";
import InvLandingPage from "./invlandingpage";
import { footerData } from "../src/Data/data";

const Inventory = () => {
  useEffect(() => {
    activeNavMenu();
  }, []);
  
  useEffect(() => {
    document.body.classList.add('homepage-body');
    
    return () => {
      document.body.classList.remove('homepage-body');
    };
  }, []);

  return (

    <>
      <Layout noFooter noHeader bodyClass={"main"}>
        <Header1 />

        <InvLandingPage />

        <Footer footerData={footerData}/>
      </Layout>
    </>
  );
};
export default Inventory;
