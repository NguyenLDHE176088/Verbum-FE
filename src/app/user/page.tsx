import Index from "@/components/user/manage/screen";
export default function Users() {
  return (
    <div className="flex flex-col overflow-hidden">
      <span className="w-full pt-6 pb-3">
        <p className="ml-4 text-3xl font-bold text-black">Users</p>
      </span>
      <Index />
    </div>
  );
}
