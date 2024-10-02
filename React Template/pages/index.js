import { useEffect } from "react";
import Footer2 from "../src/layouts/Footer2";
import Header1 from "../src/layouts/header/Header1";
import Layout from "../src/layouts/Layout";
import { activeNavMenu } from "../src/utils";
import Slider from "../src/components/slider";

const Index = () => {
  useEffect(() => {
    activeNavMenu();
  }, []);

  return (
    <Layout noFooter noHeader bodyClass={"main"}>
      <Header1 />
      
      <Slider />

      
      <Footer2 />

      {/* <JJBanner /> */}
    </Layout>
  );
};
export default Index;
