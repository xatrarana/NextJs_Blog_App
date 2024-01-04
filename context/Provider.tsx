'use client';
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import { FC, ReactNode } from "react";

const queryClient = new QueryClient();
interface IProviderProps {
    children: ReactNode;
}
const Providers: FC<IProviderProps> =  ({children}) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
export default Providers;