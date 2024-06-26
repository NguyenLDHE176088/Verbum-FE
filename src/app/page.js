'use client'

import { MainLayout } from "@/components/layouts/MainLayout";
import UserInfor from "@/components/auth/user-infor";
import { createContext, useEffect, useState } from "react";
import { LanguageContextProvider } from "@/context/languageContext";

export const LanguageContext = createContext();


export default function Home() {
    const [isCompany, setIsCompany] = useState(null);

    useEffect(() => {
        const companyStatus = localStorage.getItem('isCompany');
        setIsCompany(companyStatus);
    }, []);

    return (
        <MainLayout>
            {isCompany !== 'true' && <UserInfor />}
        </MainLayout>
    );
}
