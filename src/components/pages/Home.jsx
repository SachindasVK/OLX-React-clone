import { useState } from "react";
import Navbar from "../navbar/Navbar";
import Login from "../modal/Login";
import Sell from "../modal/Sell";
import Card from "../cards/Card";
import { useItem } from "../context/Item";
import Footer from "../footer/Footer";


const Home = () => {
  const [openModal, setModal] = useState(false);
  const [openModalSell, setModalSell] = useState(false);

  const toggleModal = () => {
    setModal((prev) => !prev);
  };
  const toggleModalSell = () => {
    setModalSell((prev) => !prev);
  };

  const itemsCtx = useItem(); //refers to the context value;

  return (
    <div>
      <Navbar toggleModal={toggleModal} toggleModalSell={toggleModalSell} />
      <Login toggleModal={toggleModal} status={openModal} />
      <Sell
        setItems={itemsCtx.setItems}
        toggleModalSell={toggleModalSell}
        status={openModalSell}
      />
      <Card items={itemsCtx.items || []} />
      <Footer />
    </div>
  );
};

export default Home;
