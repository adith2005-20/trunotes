'use client'

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy } from "lucide-react"
import { toast } from "sonner"
import Header from "@/app/_components/Header"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

const Page = () => {
    const router = useRouter()
    const [accessCode, setAccessCode] = useState("");
    const [error, setError] = useState("");
    return (
        <>
            <div className="flex h-screen items-center justify-center w-full ">
                <Card className="w-full max-w-lg p-2">
                    <CardHeader><CardTitle className="j25 text-4xl font-bold text-center">Enter access code</CardTitle></CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <InputOTP
                            maxLength={6}
                            value={accessCode}
                            onChange={(e) => {
                                setAccessCode(e);
                                setError("");
                            }}
                            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
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
                    <CardFooter className="flex flex-col gap-2 items-center">
                        <Button
                            onClick={() => {
                                router.push(`/tempnotes/access/${accessCode}`)
                            }}
                            disabled={!accessCode || accessCode.length!=6 || error.length>0}
                        >
                            Submit
                        </Button>
                        <span className="text-muted-foreground text-xs mt-2 text-start w-full">Note: Any notes older than 24 hours may be deleted.</span>
                    </CardFooter>
                </Card>
            </div>
            
            
        </>
    )
}

export default Page;