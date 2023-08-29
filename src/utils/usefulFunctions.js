export function groupCartItems(cartItemsParameter, quantitiesParameter) {
    const countMap = {};
    cartItemsParameter.forEach(item => {
      const { id } = item;
      if (!countMap[id]) {
        countMap[id] = { ...item, quantity: quantitiesParameter[id] || 0 }; // Use stored quantity
      } else {
        countMap[id] = { ...item, quantity: countMap[id].quantity + (quantitiesParameter[id] || 0) };
      }
    });
    // Return an array of grouped cart items
    return Object.values(countMap);
  }
  
export function calculateTotalPriceAndQuantity (cartItemsParameter, quantitiesParameter){
    const result = cartItemsParameter.reduce((accumulator, item) => {
        const itemPrice = item.promoprice || item.price;
        const qtd = quantitiesParameter[item.id];
        const itemTotal = itemPrice * qtd;
        
        return {
        total: accumulator.total + itemTotal,
        quantity: accumulator.quantity + qtd
        };
    }, { total: 0, quantity: 0 });

    return {
        total: result.total.toFixed(2)
    };
};

export function generateMessage (cartItems){
  const message = cartItems.map(
    (product) => `${product.name} - Price: ${product.promoprice ? product.promoprice : product.price} - Qtd: ${product.quantity} Codigo: ${product.codigo}`
  );
  return message.join('\n');
};