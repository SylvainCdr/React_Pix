import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function Products() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/products")
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    return (
        <>
            {products.map((product) => (
                <div>
                    <p>{product.name}</p>
                    <p>{product.price} €</p>
                    <Link to={"/products/" + product.id}>En savoir plus</Link>
                </div>
            ))}
        </>
    )
}