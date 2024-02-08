import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function Products() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/products")
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

// console.log(products);

  
            {/* {products.map((product) => (
                <div>
                    
                    <p>{product.name}</p>
                    <p>{product.price} €</p>
                    <Link to={"/product/" + product.id}>Voir le produit</Link>
                </div>

            ))} */}


return (
  <>
    {products.map((product) => (
      
      <div key={product._id}>
        <p>{product.name}</p>
        <p>{product.price} €</p>
        <Link to={`/product/${product._id}`}>Voir le produit</Link>
      </div>
    ))}

  
  </>
);


       
    
}