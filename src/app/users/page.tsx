import { MainLayout } from "@/components/layouts/MainLayout";
import Index from "@/components/user/manage/screen";
import Head from "next/head";
export default function Users() {
  return (
    <>
      <MainLayout>
        <div className="flex flex-col overflow-hidden">
          <Index />
        </div>
      </MainLayout>
    </>
  );
}
