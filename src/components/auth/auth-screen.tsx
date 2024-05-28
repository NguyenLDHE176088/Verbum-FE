import {cn} from "@/lib/utils";
import {montserrat} from "../../../fonts";
import {Button} from "@/components/ui/button";
import {FcGoogle} from "react-icons/fc";
import React from "react";

interface AuthScreenProps {
    children?: React.ReactNode;
}

export default function AuthScreen({children}: AuthScreenProps) {
    return (
        <div className={cn('w-full h-full flex flex-row', montserrat.className)}>
            <div className='h-full w-full bg-black flex items-center justify-center '>
                <p className='text-6xl text-white font-bold'>
                    The <span className='text-[#00B090]'>localization</span> <br/> platform that&apos;s easy to use
                </p>
            </div>
            <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
                {children}
                <div className='flex flex-col items-center gap-2'>
                    <p className='text-sm text-[#737373]'>Or login with</p>
                    <Button variant='outline' size='icon'>
                        <FcGoogle size={25}/>
                    </Button>
                </div>
            </div>
        </div>
    );
}
