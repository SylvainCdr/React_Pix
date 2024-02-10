import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import style from "./style.scss"

function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <main className="container">
      <div className="row">
        <div className="col-12">
          <h1>Nos produits</h1>
        </div>

        {products.map((product) => (
          <div className="col-3 mb-4" key={product._id}>
            <article className="card h-100">
              <div className="card-body">
                <div className="card-title">
                  <h2>{product.name}</h2>
                </div>
                <img src={product.image} alt={product.name} className="card-img-top" />
                <p className="card-text">{product.name}</p>
                <p className="card-text">{product.price} €</p>
                <Link to={`/product/${product._id}`}>Voir le produit</Link>
              </div>
            </article>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Products;
