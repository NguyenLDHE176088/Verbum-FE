"use client"
import { useEffect, useContext } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const DynamicUserInfor = dynamic(() => import("@/components/auth/user-infor.tsx"));

export default function Home() {
  const router = useRouter();
  const { userData } = useContext(UserContext);
  console.log("Home component userData:", userData);

  useEffect(() => {
    if (userData.isLogin) {
      if (userData.isHasCompany) {
        router.push("/projects");
      }
    }
  }, [userData, router]);

  if (!userData.isLogin) {
    return <DynamicUserInfor />;
  } else {
    return null; // or a loading spinner
  }
}
