import { Sidebar } from "./layout_part/Sidebar";

export default function DashboardLayout({children}: {children: React.ReactNode}){
    return (
        <div className="flex">
            <div className="flex flex-col mr-1">
                <Sidebar />
            </div>
            <div className="flex flex-col">
                {children}
            </div>
        </div>
    )
}