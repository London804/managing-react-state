import React, { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Spinner from './Spinner';
import useFetch from './services/useFetch';



export default function App() {
    const [size, setSize] = useState("");

    const { data: products, loading, error } = useFetch(
        "products?category=shoes"
    );

    // the above is equivalent to
    // const state = useState('');
    // const size = state[0];
    // const setSize = state[1];

    // async await
    // this is syntatic sugar over promises
    // useEffect(() => {
    //     async function init(params) {
    //         try {
    //             const response = await getProducts('shoes');
    //             setProducts(response);
    //         } catch (e) {
    //             setError(e)
    //         } finally {
    //             setLoading(false)
    //         }
    //     } 
    //     init()
    // }, [])

    // Promoise version
    // useEffect(() => {
    //     getProducts('shoes')
    //     .then((response) => setProducts(response))
    //     .catch((e) => setError(e))
    //     .finally(() => setLoading(false));
    // }, [])
    
    function renderProduct(p) {
      return (
        <div key={p.id} className="product">
          <a href="/">
            <img src={`/images/${p.image}`} alt={p.name} />
            <h3>{p.name}</h3>
            <p>${p.price}</p>
          </a>
        </div>
      );
    }

    const filteredProducts = size 
    ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size)))
    : products;

    if (error) throw error;
    if (loading) return <Spinner />
    return (
        <>
            <div className="content">
                <Header />
                <main>
                    <section id="filters">
                        <label htmlFor="size">Filter by Size:</label>{" "}
                        <select id="size" value={size} onChange={(e) => setSize(e.target.value)}>
                            <option value="">All sizes</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                        </select>
                    </section>

                    { size && <h2> Found {filteredProducts.length} items </h2>}

                    <section id="products">
                        {filteredProducts.map(renderProduct)}
                    </section>
                </main>
            </div>
            <Footer />
        </>
    );
}
