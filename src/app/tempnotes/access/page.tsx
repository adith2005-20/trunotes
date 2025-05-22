'use client'

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy } from "lucide-react"
import { toast } from "sonner"
import Header from "@/app/_components/Header"
import { useState } from "react"
import { useRouter } from "next/navigation"

const Page = () => {
    const router = useRouter()
    const [accessCode, setAccessCode] = useState("");
    const [error, setError] = useState("");
    return (
        <>
            <Header />
            <div className="mt-24 flex h-screen items-center justify-center w-full ">
                <Card>
                    <CardHeader><CardTitle className="j25 text-4xl font-bold">Enter access code</CardTitle></CardHeader>
                    <CardContent>
                        <InputOTP
                            maxLength={6}
                            value={accessCode}
                            onChange={(e) => {
                                setAccessCode(e);
                                setError("");
                            }}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={() => {
                                router.push(`/tempnotes/access/${accessCode}`)
                            }}
                            disabled={!accessCode || accessCode.length!=6}
                        >
                            Submit
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            
            
        </>
    )
}

export default Page;