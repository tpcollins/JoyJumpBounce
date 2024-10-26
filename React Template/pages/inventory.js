import Footer from "../src/layouts/Footer";
import Header1 from "../src/layouts/header/Header1";
import Layout from "../src/layouts/Layout";
import { accessoryData } from "../src/Data/data";
import { useEffect } from "react";
import InvLandingPage from "./invlandingpage";

const Inventory = () => {
  useEffect(() => {
    document.body.classList.add('inventory-body');
    
    return () => {
      document.body.classList.remove('inventory-body');
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
