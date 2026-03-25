import { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import Login from '../modal/Login'
import Sell from '../modal/Sell'
import Card from '../cards/Card'
import { ItemsContext } from '../context/Item'
import { fetchFromFirestore } from '../firebase/firebase'


const Home = () => {
  const[openModal,setModal] = useState(false)
  const [openModalSell ,setModalSell] = useState(false)


  const toggleModal = ()=>{setModal(!openModal)}
  const toggleModalSell = () => {setModalSell(!openModalSell)}


  const itemsCtx =ItemsContext();//refers to the context value;

  useEffect(()=>{

    const getItems = async ()=>{
      const datas = await fetchFromFirestore();
      itemsCtx ?.setItems(datas); // Fetch and set items in context
    }
    
    
    getItems();
    
  },[])
  

  useEffect(()=>{
    console.log('Updated Items:' ,itemsCtx.items);

  },[itemsCtx.items])


  return (
    <div>
     <Navbar toggleModal={toggleModal}   toggleModalSell={toggleModalSell}/>
     <Login  toggleModal={toggleModal}  status={openModal}/>
     <Sell setItems={(itemsCtx).setItems} toggleModalSell={toggleModalSell} status={openModalSell}  />
      <Card items={(itemsCtx).items  || []} />
    </div>
  )
}

export default Home
