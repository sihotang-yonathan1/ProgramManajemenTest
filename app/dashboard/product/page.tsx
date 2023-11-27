'use client'

import { getPendingProductRequest } from "../../api/v1/product_request/product"
import { useEffect, useState } from "react"


type ProductRequest = {
    product_id: number;
    product_name: string | null;
    product_quantity: number | null;
    username: string;
    type: string;
}

export default function ProductPage(){
    const [productRequestData, setProductRequestData] = useState<ProductRequest[]>([])
    
    const fetchProductRequest = async () => {
        let response = await getPendingProductRequest()
        if (response.length > 0){
            setProductRequestData(response)
        }
    }

    useEffect(() => {
        fetchProductRequest()
    }, [])

    function handleProductStatus(product_id: number, newStatus: string){
        const updateProductStatus = async () => {
            await fetch('http://localhost:3000/api/v1/product_request', {
                method: "PATCH",
                credentials: "include",
                body: JSON.stringify({
                    'product_id': product_id,
                    'new_status': newStatus
                })
            })
            fetchProductRequest()
        }
        updateProductStatus()
        
    }

    return (
        <section className="flex flex-grow flex-col">
            <div className="flex flex-col items-center bg-slate-400">
                <p className="font-semibold">Product</p>
            </div>
            <div className="flex flex-col items-center">
                <h3 className="font-semibold">Product Request</h3>
            </div>
            <div className="overflow-x-auto">
                {productRequestData.map((value, index) => {
                    return (
                        <div key={index}>
                            <div className="flex flex-row flex-grow mt-1">
                                <div className="flex flex-col ml-2 px-2">
                                    <p>Product Name: {value.product_name}</p>
                                    <p>Quantity: {value.product_quantity}</p>
                                    <p>Issuer: {value.username}</p>
                                </div>
                                <div className="flex flex-grow items-center mx-2 justify-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <p>Operation Type</p>
                                        <p className="uppercase">{value.type}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col mr-2 justify-center">
                                    <div className="flex-col flex m-1">
                                        <button className="bg-green-300 p-2" onClick={() => handleProductStatus(value.product_id, 'accepted')}>Accept</button>
                                    </div>
                                    <div className="flex-col flex m-1">
                                        <button className="bg-red-500 p-2" onClick={() => handleProductStatus(value.product_id, 'rejected')}>Reject</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}