"use client"
import { AuthCard } from "@daveyplate/better-auth-ui"
 
export function AuthView({ pathname }: { pathname: string }) {
    return (
        <main className="flex flex-col">
            <div className="flex items-center flex-col justify-center grow p-4 mt-24">
                <AuthCard pathname={pathname} />
            </div>
        </main>
    )
}