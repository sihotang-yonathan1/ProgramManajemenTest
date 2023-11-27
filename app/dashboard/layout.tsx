import { Metadata } from "next";
import { Sidebar } from "./layout_part/Sidebar";

export const metadata: Metadata = {
    title: 'Program Manajemen - SI',
    description: 'Dibuat oleh kelompok 3',
}

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