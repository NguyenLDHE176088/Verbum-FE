import { MainLayout } from "@/components/layouts/MainLayout";
import Index from "@/components/user/manage/screen";
import Head from "next/head";
export default function Users() {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <MainLayout>
        <div className="flex flex-col overflow-hidden">
          <span className="w-full pt-6 pb-3">
            <p className="ml-4 text-3xl font-bold text-black">Users</p>
          </span>
          <Index />
        </div>
      </MainLayout>
    </>
  );
}
