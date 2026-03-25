
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider } from "firebase/auth"; 
import {getStorage} from 'firebase/storage'
import { collection, getDocs, getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyD1UV1ncDUmIWeA7BA7RtUWV_i3aXOGnxc",
  authDomain: "olx-clone-d70e7.firebaseapp.com",
  projectId: "olx-clone-d70e7",
  storageBucket: "olx-clone-d70e7.firebasestorage.app",
  messagingSenderId: "1035345867446",
  appId: "1:1035345867446:web:ea5c9053e53aab56896c17"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
const fireStore = getFirestore(app);


const fetchFromFirestore = async () => {
    try {
      const productsCollection = collection(fireStore, 'products');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) 
      console.log("Fetched products from Firestore:", productList);
      return productList;
    } catch (error) {
      console.error("Error fetching products from Firestore:", error);
      return [];
    }
  };
  

  export {
    auth,
    provider,
    storage,
    fireStore,
    fetchFromFirestore
  }

