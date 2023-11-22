import Link from "next/link"

const sidebarMenus = [
    {menuName: 'Home', urlPath: '/dashboard', icon: ''},
    {menuName: 'Setting', urlPath: '/dashboard', icon: ''},
]

export function Sidebar(){
    return (
        <div className="flex flex-col h-[100dvh]">
            <div className="bg-sky-500 flex flex-wrap justify-center">
                <p>Logo</p>
            </div>
            <div className="flex flex-col flex-grow bg-blue-400 p-2">
                {sidebarMenus.map((menu, index) => {
                    return (
                        <Link key={index} href={menu.urlPath} className="flex py-2 border-b hover:bg-sky-200 mt-1">
                            <button>
                                {menu.menuName}
                            </button>
                        </Link>
                    )
                })}
            </div>
            <div className="flex flex-col">
                <Link href="/login" className="flex justify-center bg-blue-700">
                    <button className="bg-blue-700 p-2 text-white">
                        Logout
                    </button>
                </Link>
            </div>
        </div>
    )
}