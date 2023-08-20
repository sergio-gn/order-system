import React, { useState, useEffect } from "react";
import { db } from "../utils/firebaseconfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../utils/firebaseconfig";
import EditButton from "../components/ui/editButton";

function ProfileAdmin() {
  const productsCollectionRef = collection(db, "Products");
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    classification: "",
    code: "",
    name: "",
    price: 0,
    promo: false,
    promoprice: "",
    productMetric: "",
    indisponivel: false,
    photoUrl: "",
    description: ""
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [selectedProductIndisponivel, setSelectedProductIndisponivel] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false); 
  const [messages, setMessages] = useState("");

  
  const createProduct = async () => {
    try {
      // Check if required fields are filled out
      if (
        !newProduct.classification ||
        !newProduct.code ||
        !newProduct.name ||
        !newProduct.description ||
        !newProduct.price ||
        (!newProduct.promo && !newProduct.promoprice) ||
        !newProduct.productMetric
      ) {
        setMessages("Por favor, preencha todos os campos obrigatórios.");
        return;
      }
  
      // Rest of your code for handling image upload and creating the product
  
      setMessages("Produto Criado com Sucesso");
      setNewProduct({
        classification: "",
        code: "",
        name: "",
        price: 0,
        promo: false,
        promoprice: "",
        productMetric: "",
        indisponivel: false,
        photoUrl: "",
        description: ""
      });
    } catch (error) {
      setMessages("Erro ao criar produto:", error);
    }
  };
  
  
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "Products", id);
    await deleteDoc(productDoc);
  };
  
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setSelectedProductIndisponivel(product.indisponivel);
  };
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleUpdateProduct = async () => {
    if (typeof selectedProductIndisponivel === "undefined") {
      // Handle the case when selectedProductIndisponivel is undefined
      console.error("Produto Indisponivel Indefinido");
      return;
    }
    const updatedProduct = {
      ...selectedProduct,
      indisponivel: selectedProductIndisponivel,
    };
    try {
      const productDocRef = doc(db, "Products", selectedProduct.id);
      await updateDoc(productDocRef, updatedProduct);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleCancelEdit = () => {
    setSelectedProduct(null);
  };

  const handleIndisponivelChange = (event) => {
    setNewProduct({ ...newProduct, indisponivel: event.target.checked });
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      const filteredProducts = products.filter((product) => {
        const nameMatch = product.name && product.name.toLowerCase().includes(searchTermLower);
        const codeMatch = product.code && product.code.toLowerCase().includes(searchTermLower);

        return nameMatch || codeMatch;
      });

      setSearchedProducts(filteredProducts);
    } else {
      setSearchedProducts([]); // Empty array when no search term
    }
  };
  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProducts();
  }, []);


  return (
    <div className="App">
      <div className="createProduct-dad profile-card">
          <div className="createProduct">
            <input
              placeholder="Categoria..."
              value={newProduct.classification}
              onChange={(event) =>
                setNewProduct({ ...newProduct, classification: event.target.value })
              }
            />
            <input
              placeholder="Código..."
              value={newProduct.code}
              onChange={(event) =>
                setNewProduct({ ...newProduct, code: event.target.value })
              }
              />
            <input
              placeholder="Nome..."
              value={newProduct.name}
              onChange={(event) =>
                setNewProduct({ ...newProduct, name: event.target.value })
              }
              />
            <textarea
              placeholder="Descrição..."
              value={newProduct.description}
              onChange={(event) =>
                setNewProduct({ ...newProduct, description: event.target.value })
              }
              />
            <input
              placeholder="Preco..."
              value={newProduct.price}
              onChange={(event) =>
                setNewProduct({ ...newProduct, price: event.target.value })
              }
              />
            <input
              placeholder="Promocional..."
              value={newProduct.promoprice}
              onChange={(event) =>
                setNewProduct({ ...newProduct, promoprice: event.target.value })
              }
              />
            <input
              placeholder="Un, Cx, Duzia..."
              value={newProduct.productMetric}
              onChange={(event) =>
                setNewProduct({ ...newProduct, productMetric: event.target.value })
              }
              />
            <div className="d-flex">
              Indisponivel:
              <input
                type="checkbox"
                checked={newProduct.indisponivel}
                onChange={handleIndisponivelChange}
              />
            </div>
            <input type="file" onChange={(event) => handleFileUpload(event)} />
          </div>
          <EditButton buttonText={"Criar Produto"} onClick={createProduct}/>
          {messages}
      </div>
      <div className="profile-edit-product gap-1">
        <input
          className="searchBar-full"
          placeholder="Buscar pelo nome ou code..."
          value={searchTerm}
          onChange={(event) => handleSearch(event.target.value)}
        />
        <div className="productCards">
          {searchedProducts.map((product) => {
            return (
              <div className="productCardAdmin" key={product.id}>
                <p>Produto: {product.name}</p>
                <p>code: {product.code}</p>
                <div className="gap-05 d-flex">
                  <EditButton buttonText={"Deletar Produto"} onClick={() => deleteProduct(product.id)}/>
                  <button onClick={() => handleSelectProduct(product)}>Editar Produto</button>
                </div>
              </div>
            );
          })}
        </div>
        {selectedProduct && (
          <div>
            <p>Editar Produto:</p>
              <div className="editProduct-dad profile-card">
                <input
                  placeholder="Classificação..."
                  value={selectedProduct.classification}
                  onChange={(event) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      classification: event.target.value,
                    })
                  }
                  />
                <input
                  placeholder="Código..."
                  value={selectedProduct.code}
                  onChange={(event) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      code: event.target.value,
                    })
                  }
                  />
                <input
                  placeholder="Nome..."
                  value={selectedProduct.name}
                  onChange={(event) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      name: event.target.value,
                    })
                  }
                  />
                <input
                  type="textarea"
                  placeholder="Descrição..."
                  value={selectedProduct.description}
                  onChange={(event) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      description: event.target.value,
                    })
                  }
                  />
                <input
                  placeholder="Preço..."
                  value={selectedProduct.price}
                  onChange={(event) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      price: event.target.value,
                    })
                  }
                  />
                <input
                  placeholder="Un, Cx..."
                  value={selectedProduct.productMetric}
                  onChange={(event) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      productMetric: event.target.value,
                    })
                  }
                  />
                <div className="d-flex">
                  <input
                  placeholder="Novo preco promocional"
                  value={selectedProduct.promoprice}
                  onChange={(event) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      promoprice: event.target.value,
                    })
                  }
                  />
                <div className="d-flex">
                  Indisponivel:
                  <input
                    type="checkbox"
                    checked={selectedProductIndisponivel}
                    onChange={(event) => setSelectedProductIndisponivel(event.target.checked)}
                  />
                </div>
              </div>
              <EditButton buttonText={"Editar Produto"} onClick={handleUpdateProduct}/>
              <button onClick={handleCancelEdit}>Cancelar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileAdmin;