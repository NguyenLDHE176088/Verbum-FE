import {TriangleAlert} from 'lucide-react';

interface FormErrorProps {
    message: string
}

export default function FormError({message}: FormErrorProps) {
    if (!message) {
        return <></>;
    }
    return (
        <div className='bg-destructive/15 items-center text-destructive flex flex-row gap-2 p-3 rounded'>
            <TriangleAlert/>
            <p>{message}</p>
        </div>
    );
}
