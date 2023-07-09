import { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseconfig';
import Products from "./products";

function GetData() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch products data
      const productsSnapshot = await getDocs(collection(db, "Products"));
      const productsData = productsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProducts(productsData);

      // Fetch users data
      const usersSnapshot = await getDocs(collection(db, "users"));
      const usersData = usersSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUsers(usersData);

      console.log("UseEffect triggered in GetData component");
    };

    fetchData();
  }, []);

  return (
    <div className="products">
      <Products products={products} />
    </div>
  );
}

export default GetData;