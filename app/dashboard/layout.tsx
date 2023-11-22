import { Sidebar } from "./layout_part/Sidebar";

export default function DashboardLayout({children}: {children: React.ReactNode}){
    return (
        <div className="flex flex-grow">
            <div className="flex flex-col">
                <Sidebar />
            </div>
            <div className="flex flex-col max-w-[100dvw] flex-grow">
                {children}
            </div>
        </div>
    )
}