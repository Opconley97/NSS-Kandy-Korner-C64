import { useEffect, useState } from "react";

export const ProductList = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [priceSort, setPriceSort] = useState([false])

    const localKandyUSer = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUSer)

    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_expand=productType`)
            .then(response => response.json())
            .then((productsArray) => {
                setProducts(productsArray)
            })
        },
        []
    )

    useEffect(
        () => {
            if (priceSort) {
                const sortedProducts = products.filter(product => product.unitPrice > 2.00)
                setFilteredProducts(sortedProducts)
            } else  {
                setFilteredProducts(products)
            }
        },
        [priceSort]
    )

    useEffect(
        () => {
            setFilteredProducts(products)
        },
        [products]
    )

    return <>
    {
        kandyUserObject.staff
        ? <>
            
            <button onClick = { () => setPriceSort(false)}>Show All</button>
            <button onClick = {() => setPriceSort(true)}>Filter Prices</button>
            </>
            :<></>
    
    }
        <h2>List of Products</h2>

        <article className="products">
            {
                filteredProducts.map(
                    (product) => {
                        return <>
                        <h3>{product.name}</h3>
                        <header>{product.productType.type}</header>
                        <footer>${product.unitPrice}</footer>
                        
                        
                        </>
                    
                        
                    }
                )
            }
        </article>
    
    </>

}