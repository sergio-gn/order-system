import { useState, useEffect } from "react";
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../firebaseconfig';
import Products from "./products";

function GetData() {
  const [products, setProducts] = useState([]);
  const [classifications, setClassifications] = useState([]);
  const [selectedClassification, setSelectedClassification] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      // Fetch products data
      const productsSnapshot = await getDocs(collection(db, "Products"));
      const productsData = productsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProducts(productsData);

      // Fetch unique classifications from products data
      const uniqueClassifications = [...new Set(productsData.map((product) => product.classification))];
      setClassifications(uniqueClassifications);

      console.log("UseEffect triggered in GetData component");
    };

    fetchData();
  }, []);

  const handleClassificationChange = (event) => {
    setSelectedClassification(event.target.value);
  };

  const filteredProducts = selectedClassification
    ? products.filter((product) => product.classification === selectedClassification)
    : products;

  return (
    <div className="products">
      <select value={selectedClassification} onChange={handleClassificationChange}>
        <option value="">All Classifications</option>
        {classifications.map((classification, index) => (
          <option key={index} value={classification}>
            {classification}
          </option>
        ))}
      </select>
      <Products products={filteredProducts} />
    </div>
  );
}

export default GetData;