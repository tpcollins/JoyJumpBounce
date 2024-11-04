import Footer from "../src/layouts/Footer";
import Header1 from "../src/layouts/header/Header1";
import Layout from "../src/layouts/Layout";
import { accessoryData } from "../src/Data/data";
import { activeNavMenu } from "../src/utils";
import { useEffect } from "react";
import InvLandingPage from "./invlandingpage";

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

        <Footer />
      </Layout>
    </>
  );
};
export default Inventory;
