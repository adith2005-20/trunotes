import ClientNoteViewer from "./TempNoteViewer"
import { HydrateClient } from "@/trpc/server"
import { api } from "@/trpc/server"
import { Loader } from "lucide-react"
import { Suspense } from "react"

const Page = async ({ params }: { params: Promise<{ accesscode: string }> }) => {
    const { accesscode } = await params
    await api.tempnote.retrieveNote.prefetch({ accessCode: accesscode })
    
    return (
        <HydrateClient>
            <Suspense fallback={<><Loader className="animate-spin fixed top-1/2 left-1/2 z-50"/></>}>
                <ClientNoteViewer accesscode={accesscode}/>
            </Suspense>
        </HydrateClient>
    )
}

export default Page