'use client'

import { useEffect, useState } from "react"

type ProductDataRequestType = {
    'product_id': number,
    'product_name': string,
    'product_quantity': number,
    'type': 'add' | 'delete' | 'update',
    'username': string
}

export default function ProductPage(){
    const [productRequestData, setProductRequestData] = useState<Array<ProductDataRequestType>>([])
    
    useEffect(() => {
        const fetchProductRequest = async () => {
            let response = await fetch('http://localhost:3000/api/v1/product_request')
            if (response.ok){
                setProductRequestData(await response.json())
            }
        }
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
        }
        updateProductStatus()
    }

    return (
        <section className="flex flex-grow flex-col">
            <div className="flex flex-col items-center bg-slate-400">
                <p className="font-semibold">Product</p>
            </div>
            <div className="overflow-x-auto">
                {productRequestData.map((value, index) => {
                    return (
                        <div key={index}>
                            <div className="flex flex-row flex-grow mt-1">
                                <div className="flex flex-col flex-grow ml-2">
                                    <p>Product Name: {value.product_name}</p>
                                    <p>Quantity: {value.product_quantity}</p>
                                    <p>Issuer: {value.username}</p>
                                </div>
                                <div className="flex flex-grow">
                                    <p>Type: {value.type}</p>
                                </div>

                                <div className="flex flex-col mr-2 justify-center">
                                    <button onClick={() => handleProductStatus(value.product_id, 'accepted')}>Accept</button>
                                    <button onClick={() => handleProductStatus(value.product_id, 'rejected')}>Reject</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}