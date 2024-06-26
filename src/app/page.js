'use client'

import UserInfor from "@/components/auth/user-infor";
import { useEffect, useState } from "react";


export default function Home() {
    const [isCompany, setIsCompany] = useState(null);

    useEffect(() => {
        const companyStatus = localStorage.getItem('isCompany');
        setIsCompany(companyStatus);
    }, []);

    return (
        <>
            {isCompany !== 'true' && <UserInfor />}
        </>
    );
}
