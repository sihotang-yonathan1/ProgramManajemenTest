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
    return (
        <section className="flex flex-grow flex-col">
            <div className="flex flex-col items-center bg-slate-400">
                <p className="font-semibold text-lg">Dashboard</p>
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

            <DashboardSection title="Add product">
                <div className="flex flex-col items-center">
                    <div className="border p-2">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="capitalize">name</label>
                            <input type="text" name="name" id="name" className="border rounded p-1"/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="quantity" className="capitalize">quantity</label>
                            <input type="number" name="quantity" id="quantity" className="border rounded p-1"/>
                        </div>

                        <div className="flex justify-evenly my-1">
                            <button className="bg-green-300 p-1 rounded">Add</button>
                            <button className="bg-red-500 p-1 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            </DashboardSection>

            <DashboardSection title="Search Product">
                <div className="flex flex-col justify-center items-center">
                    <div className="border p-2">
                        <div className="flex flex-col">
                            <label htmlFor="search">Search</label>
                            <input type="text" name="search" id="search" className="border rounded"/>
                        </div>
                    </div>
                </div>
            </DashboardSection>

            <DashboardSection title="Delete product">
                <div className="flex flex-col justify-center items-center">
                    <div className="border p-2">
                        <div className="flex flex-col">
                            <label htmlFor="delete_product" className="uppercase">id</label>
                            <input type="text" name="delete_product" id="delete_product" className="border rounded p-1"/>
                        </div>
                        <div className="flex justify-evenly py-2">
                            <button className="bg-green-400 p-2">Delete</button>
                            <button className="bg-red-500 p-2">Cancel</button>
                        </div>
                    </div>
                </div>
            </DashboardSection>
        </section>
    )
}