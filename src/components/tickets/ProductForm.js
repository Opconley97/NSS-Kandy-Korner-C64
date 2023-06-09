import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProductForm = () => {
    const [newProduct, update] = useState({
        name: "",
        unitPrice: 0,
        productTypeId: 0
    })
    const [productTypes, setProductType] = useState([])

    const navigate = useNavigate()

    const localKandyUSer = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUSer)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const productToSendToAPI = {
            name: newProduct.name,
            unitPrice: newProduct.unitPrice,
            productTypeId: newProduct.productTypeId
        }

        return fetch (`http://localhost:8088/products?_expand=productType` , {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToSendToAPI)
        })
        .then(response => response.json())
        .then (() => {
            navigate("/productList")
        })
    }

    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_expand=productType`)
            .then (response => response.json())
            .then((productsArray) => {
                setProductType(productsArray)
            })
        },
        []
    )

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="What candy are you adding?"
                        value={newProduct.name}
                        onChange={
                            (evt) => {
                                const copy = {...newProduct}
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="productPrice">Price per unit?:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="How much does it cost per unit?"
                        value={newProduct.unitPrice}
                        onChange={
                            (evt) => {
                                const copy = {...newProduct}
                                copy.unitPrice = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            {/*<fieldset>
                <div className="form-group">
                    <label htmlFor="productTypeId">Product Type ID?:</label>
                    <select>(
                        
                        <option value="0">Select a candy type</option>
                        <option value="Chocolate">Chocolate</option>
                        <option value="Gummies">Gummies</option>
                        <option value="Taffy">Taffy</option>
                        <option value="Ice Cream">Ice Cream</option>
                        onChange={
                            (evt) => {
                                const copy = {...productTypes}
                                evt.value === productTypes.productType?.type
                                ? 
                                copy.productTypeId = productTypes.productType?.id
                                : <></>
                                update(copy)
                            }
                        }
                    )</select>
                </div>
                    </fieldset>*/}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="productTypeId">Product Type ID?:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="What is the product type ID?"
                        value={newProduct.productTypeId}
                        onChange={
                            (evt) => {
                                const copy = {...newProduct}
                                copy.productTypeId = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
                    </fieldset>
            <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
                Add Product
            </button>
            <div className="form-group">
                <h3>Product Type ID Legend</h3>
                <ul>
                    <li>
                        Chocolate: 1
                    </li>
                    <li>
                        Gummies: 2
                    </li>
                    <li>
                        Taffy: 3
                    </li>
                    <li>
                        Ice Cream: 4
                    </li>
                </ul>
            </div>
        </form>
    )

}