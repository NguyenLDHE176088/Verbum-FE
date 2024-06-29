"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState  } from "react";
import dynamic from "next/dynamic";
import "@/components/auth/user-infor.tsx";
import "./globals.css";

const DynamicUserInfor = dynamic(() => import("@/components/auth/user-infor.tsx"));

export default function Home() {
    const router = useRouter();
    const [isCompany, setIsCompany] = useState(false);

    useEffect(() => {
        const companyStatus = Boolean(localStorage.getItem("isCompany"));
        setIsCompany(companyStatus);
    }, []);

    useEffect(() => {
        if (isCompany) {
            router.push("/projects");
        }   
    }, [isCompany]);

    return <DynamicUserInfor />;
}
