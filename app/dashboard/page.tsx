'use client'

import React, { useEffect, useState } from "react"

function DashboardSection({title, children}:{title: string, children: React.ReactNode}){
    return (
        <div className="flex flex-col">
                <div className="flex justify-center">
                    <p className="font-semibold capitalize">{title}</p>
                </div>
                {children}
            </div>
    )
}

type ProductDataType = {
    'id': number,
    'name': string,
    'quantity': number
}

type ProductDataRequestType = {
    'id': number,
    'name': string,
    'quantity': number,
    'type': 'add' | 'delete' | 'update'
}

export default function DashboardHomePage(){
    const [isAddDialogVisible, setAddDialogVisible] = useState(false)
    const [productData, setProductData] = useState<Array<ProductDataType>>([])
    const [addProductInfo, setAddProductInfo] = useState<ProductDataRequestType>({
        id: -1,
        name: 'dummy',
        quantity: -1,
        type: 'add'
    })

    useEffect(() => {
        const fetchProduct = async () => {
            let response = await fetch(`http://localhost:3000/api/v1/product`)
            if (response.ok){
                let data = await response.json()
                setProductData(data)
            }
        }
        fetchProduct()
    }, [])

    function handleAddProductRequest(){
        // TODO: change user based on current user
        const user = 'user'
        const requestAddProduct = async () => {
            await fetch('http://localhost:3000/api/v1/product_request', {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    'product_id': addProductInfo.id,
                    'product_name': addProductInfo.name,
                    'product_quantity': addProductInfo.quantity,
                    'type': 'add',
                    'username': user
                })
            })
        }
        requestAddProduct()
    }

    function handleDeleteProductRequest(product_id: number, product_name: string, quantity: number){
        // TODO: change user based on current user
        const user = 'user'
        const requestAddProduct = async () => {
            await fetch('http://localhost:3000/api/v1/product_request', {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    'product_id': product_id,
                    'product_name': product_name,
                    'product_quantity': quantity,
                    'type': 'delete',
                    'username': user
                })
            })
        }
        requestAddProduct()
    }

    return (
        <section className="flex flex-grow flex-col">
            <div className="flex flex-col items-center bg-slate-400">
                <p className="font-semibold text-lg">Dashboard</p>
            </div>

            <div className="flex flex-col items-center">
                <div className="flex flex-col">
                    <p className="font-semibold">Product List</p>
                </div>
                <div className="overflow-x-auto flex">
                    {productData.map((value, index) => {
                        return (
                            <div key={index} className="mx-1 px-1">
                                <div className="border p-2">
                                    <p className="capitalize font-semibold">{value.name}</p>
                                    <div className="flex flex-col items-center">
                                        <p>{value.quantity} {value.quantity > 1 ? 'items': 'item'}</p>
                                    </div>
                                    <div className="flex flex-col items-center mt-1">
                                        <button className="bg-red-400 p-2" onClick={() => handleDeleteProductRequest(value.id, value.name, value.quantity)}>Delete</button>
                                    </div>
                                    <div className="flex flex-col items-center mt-1">
                                        <button className="bg-yellow-300 p-1" onClick={() => console.log("Feature to update not added yet")}>Update</button>
                                    </div>
                                    <div className="flex flex-col items-center mt-1">
                                        <button className="bg-green-300 p-1">Buy</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            { isAddDialogVisible && <div className="pt-1">
                <DashboardSection title="">
                    <div className="flex flex-col items-center">
                        <div className="border p-2">
                            <div className="flex flex-col items-center">
                                <h3 className="font-semibold">Add Product</h3>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="product_id_add" className="capitalize">ID</label>
                                <input type="text" name="product_id_add" id="product_id_add" className="border rounded p-1" 
                                    onChange={(event) => setAddProductInfo({
                                        ...addProductInfo,
                                        'id': Number(event.target.value)
                                    })}/>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="name" className="capitalize">name</label>
                                <input type="text" name="name" id="name" className="border rounded p-1"
                                    onChange={(event) => setAddProductInfo({
                                        ...addProductInfo,
                                        'name': event.target.value
                                    }
                                )}/>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="quantity" className="capitalize">quantity</label>
                                <input type="number" name="quantity" id="quantity" className="border rounded p-1"
                                    onChange={(event) => setAddProductInfo({
                                        ...addProductInfo,
                                        'quantity': Number(event.target.value)
                                    }
                                )}/>
                            </div>

                            <div className="flex justify-evenly my-1">
                                <button className="bg-green-300 p-1 rounded" onClick={() => {
                                    handleAddProductRequest()
                                    setAddDialogVisible(false)
                                }}>Add</button>
                                <button className="bg-red-500 p-1 rounded" onClick={() => {
                                    setAddDialogVisible(false)
                                }}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </DashboardSection>
            </div>}

            <div className="absolute bottom-0 right-0 m-2 bg-sky-400 py-1 px-2 rounded">
                {/* TODO: change + to icon */}
                <button onClick={() => setAddDialogVisible(true)}>+</button>
            </div>
        </section>
    )
}