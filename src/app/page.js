import Image from "next/image";
import styles from "./page.module.css";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"


import '@/components/common/NavBar'
import NavBar from "@/components/common/NavBar";


export default function Home() {
  return (
    <NavBar />  
  );
}
