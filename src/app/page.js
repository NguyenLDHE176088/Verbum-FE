'use client'

import Image from "next/image";
import styles from "./page.module.css";
import {MainLayout} from "@/components/layouts/MainLayout";
import UserInfor from "@/components/auth/user-infor";


export default function Home() {
    const isCompany = localStorage.getItem('isCompany')

    return (
        <MainLayout>
            {isCompany !== 'true' && <UserInfor/>}
        </MainLayout>
    )
}
