import InventoryComp from "../src/components/InventoryComp";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layouts/Layout";

const Inventory = () => {
  return (
    <Layout bodyClass={"gallery"}>
      <PageBanner pageName={"Gallery"} />
        <InventoryComp />
    </Layout>
  );
};
export default Inventory;
