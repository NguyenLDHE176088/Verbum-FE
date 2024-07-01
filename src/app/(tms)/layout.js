import { MainLayout } from "@/components/layouts/MainLayout";

export default function RootLayout({ children }) {
    return (
        <MainLayout>
            {children}
        </MainLayout>
    );
}
