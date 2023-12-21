import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export default function Product() {
    const [product, setProduct] = useState({
        options: []
    })
    const { id } = useParams()

    useEffect(() => {
        fetch("http://localhost:3001/products/" + id)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [])
    return (
        <>
            <h1>{product.name}</h1>
            <h2>{product.manufacturer}</h2>
            <h3>{product.price} €</h3>
            <p>Stock : {product.stock}</p>
            <div>
                Options :
                <ul>
                    {product.options.map((option) => (
                        <li>{option}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}