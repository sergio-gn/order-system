import React, { useState, useEffect } from "react";
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../firebaseconfig';
import Products from "./products";
import SearchBar from "./SearchBar";

function GetData() {
  const [products, setProducts] = useState([]);
  const [classifications, setClassifications] = useState([]);
  const [selectedClassification, setSelectedClassification] = useState('');
  const [searchedProducts, setSearchedProducts] = useState([]);

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
    setSearchedProducts([]);
  };

  const handleSearch = (searchTerm) => {
    setSelectedClassification('');
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
  
      const filteredProducts = products.filter((product) => {
        const nameMatch = product.name && product.name.toLowerCase().includes(searchTermLower);
        const codigoMatch = product.codigo && product.codigo.toLowerCase().includes(searchTermLower);
  
        return nameMatch || codigoMatch;
      });
  
      setSearchedProducts(filteredProducts);
    } else {
      setSearchedProducts([]);
    }
  };
  
  
  const filteredProducts = selectedClassification
    ? products.filter((product) => product.classification === selectedClassification)
    : searchedProducts.length > 0
      ? searchedProducts
      : products;

  return (
    <div className="products">
      <SearchBar handleSearch={handleSearch} />
      <select value={selectedClassification} onChange={handleClassificationChange}>
        <option value="">All Classifications</option>
        {classifications.map((classification, index) => (
          <option key={index} value={classification}>
            {classification}
          </option>
        ))}
      </select>
      <Products filteredProducts={filteredProducts} />
    </div>
  );
}

export default GetData;
