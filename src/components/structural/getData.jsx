import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../utils/store";
import Products from "./products";
import SearchBar from "../ui/searchBar";
import { TiZoomIn } from "react-icons/ti";

function GetData({ addToCart }) {
  const dispatch = useDispatch();
  const [selectedClassification, setSelectedClassification] = useState('');
  const [searchedProducts, setSearchedProducts] = useState([]);
  // Memoize the products data using useMemo
  const products = useSelector((state) => state.products.products);
  const memoizedProducts = useMemo(() => products, [products]);
  // Compute classifications using useMemo to ensure memoization
  const classifications = useMemo(() => {
    return [...new Set(memoizedProducts.map((product) => product.classification))];
  }, [memoizedProducts]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleClassificationChange = (event) => {
    setSelectedClassification(event.target.value);
    setSearchedProducts([]);
  };

  const handleClassificationClick = (classification) => {
    setSelectedClassification(classification);
    setSearchedProducts([]);
  };

  const handleShowAllClassifications = () => {
    setSelectedClassification('');
    setSearchedProducts([]);
  };

  const handleSearch = (searchTerm) => {
    setSelectedClassification('');
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      const filteredProducts = memoizedProducts.filter((product) => {
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
    ? memoizedProducts.filter((product) => product.classification === selectedClassification)
    : searchedProducts.length > 0
      ? searchedProducts
      : memoizedProducts;

  return (
    <div className="container">
      <div className="Select_and_Search_Bar">
          <select className="selectBar" value={selectedClassification} onChange={handleClassificationChange}>
            <option value="">All Classifications</option>
            {classifications.map((classification, index) => (
              <option key={index} value={classification}>
                {classification}
              </option>
            ))}
          </select>
          <SearchBar handleSearch={handleSearch} >
            <TiZoomIn/>
          </SearchBar>
      </div>
      <div className="home_container">
        <div className="parent-products">
          <Products addToCart={addToCart} filteredProducts={filteredProducts} />
        </div>
        <div className="parent-categories">
          <div className="child-categories">
            <p className="small-title">Categorias</p>
            <div className="categoriesButtons">
              <button onClick={handleShowAllClassifications}>Show All</button>
              {classifications.map((classification, index) => (
                  <button key={index} onClick={() => handleClassificationClick(classification)}>
                    {classification}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetData;