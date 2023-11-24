'use client'

import { useState } from "react"

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

export default function DashboardHomePage(){
    const [isAddDialogVisible, setAddDialogVisible] = useState(false)
    return (
        <section className="flex flex-grow flex-col">
            <div className="flex flex-col items-center bg-slate-400">
                <p className="font-semibold text-lg">Dashboard</p>
            </div>

            <div className="flex flex-col items-center">
                <div className="flex flex-col">
                    <p className="font-semibold">Product List</p>
                </div>
            </div>

            <DashboardSection title="Product">
                <div className="flex">
                    <div className="p-2">
                        <button>Add</button>
                    </div>
                    <div className="p-2">
                        <button>Search</button>
                    </div>
                    <div className="p-2">
                        <button>Delete</button>
                    </div>
                </div>
            </DashboardSection>
            { isAddDialogVisible && <div>
                <DashboardSection title="Add product">
                    <div className="flex flex-col items-center">
                        <div className="border p-2">
                        <div className="flex flex-col">
                                <label htmlFor="product_id_add" className="capitalize">ID</label>
                                <input type="text" name="product_id_add" id="product_id_add" className="border rounded p-1"/>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="name" className="capitalize">name</label>
                                <input type="text" name="name" id="name" className="border rounded p-1"/>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="quantity" className="capitalize">quantity</label>
                                <input type="number" name="quantity" id="quantity" className="border rounded p-1"/>
                            </div>

                            <div className="flex justify-evenly my-1">
                                <button className="bg-green-300 p-1 rounded" onClick={() => {
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