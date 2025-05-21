"use client"
import Image from "next/image"
import { AuthCard } from "@daveyplate/better-auth-ui"
import Link from "next/link"
 
export function AuthView({ pathname }: { pathname: string }) {
    return (
        <main className="flex flex-col">
            <div className="flex items-center justify-center mb-8 bg-sidebar-primary w-full h-16">
                <Link href='/ '><Image src="/trunotes-logo-lg.svg" alt="Trunotes" width={96} height={96} /></Link>
            </div>
            <div className="flex items-center flex-col justify-center grow p-4">
                <AuthCard pathname={pathname} />
            </div>
        </main>
    )
}