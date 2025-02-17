import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { ProductCard } from './ProductCard';
import { Navbar } from './Navbar';
import { CartModal } from './CartModal';
import { Cart } from './Cart';
import { ProductFull } from './ProductFull';
import './App.css';



function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [modalState, setModalState] = useState(false);


  let fetchProducts = async () => {
    const productsData = await fetch('https://fakestoreapi.com/products')
    const productResponse = await productsData.json()
    setProducts(productResponse)
  }

  let addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    setCart([...cart]);
    setTotal(parseFloat(cart.reduce((acc, current) => acc + current.price * current.quantity, 0).toFixed(2)));
  };

  let removeCart = (product) => {
    cart.splice(cart.indexOf(product), 1)
    setCart([...cart])
    setTotal(parseFloat(cart.reduce((acc, current) => acc + current.price * current.quantity, 0).toFixed(2)));
  }

  let increaseQuantity = (product) => {
    const index = cart.indexOf(product);
    cart[index].quantity += 1;
    setCart([...cart]);
    setTotal(parseFloat(cart.reduce((acc, current) => acc + current.price * current.quantity, 0).toFixed(2)));
  };
  
  let decreaseQuantity = (product) => {
    const index = cart.indexOf(product);
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
      setCart([...cart]);
      setTotal(parseFloat(cart.reduce((acc, current) => acc + current.price * current.quantity, 0).toFixed(2)));
    }
  };
  
  
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='min-h-screen bg-gray-200'>
      <BrowserRouter>
        <Navbar cart={cart} setModalState={setModalState} />
        <div className='container mx-auto px-4 py-16'>
          <Routes>
            <Route index element={<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5'>
              {products.map((product) => <ProductCard key={product.id} product={product} addToCart={addToCart} />)}
            </div>} />
            <Route path="/cart" element={<Cart cart={cart} total={total} setModalState={setModalState} removeCart={removeCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />} />
            <Route path="product/:id" element={<ProductFull products={products} addToCart={addToCart}/>} />
          </Routes>
        </div>

      


      {modalState && (<CartModal cart={cart} total={total} setModalState={setModalState} removeCart={removeCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />)}
      </BrowserRouter>
    </div >

  )
}

export default App
