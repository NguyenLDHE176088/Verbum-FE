import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/user/create/components/combobox";
export default function CreateUserForm() {
  return (
    <div className="flex flex-col overflow-hidden">
      <span className="w-full pt-6 pb-3">
        <p className="ml-4 text-3xl font-bold text-black">Create User</p>
      </span>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="p-2 w-full max-w-md border rounded-sm">
          <form className="flex flex-col space-y-4">
            <Input type="text" placeholder="Enter firstname" />
            <Input type="text" placeholder="Enter lastname" />
            <Input type="text" placeholder="Enter username" />
            <Input type="email" placeholder="Enter email" />
            <Combobox />
            <Button type="submit">Create</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
