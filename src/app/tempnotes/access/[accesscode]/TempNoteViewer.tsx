'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'
import Header from '@/app/_components/Header'
import { api } from '@/trpc/react'
import { Textarea } from '@/components/ui/textarea'

export default function ClientNoteViewer({accesscode}: {accesscode: string}) {
    const [data] = api.tempnote.retrieveNote.useSuspenseQuery({accessCode: accesscode})
    const content = data?.content

  return (
    <>
      <Header />
      <div className="mt-24 flex h-screen justify-center">
        <Card className="w-full max-w-lg p-4">
          <CardHeader>
            <CardTitle className='j25 text-4xl font-bold'>Here{"'"}s your note :)</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea disabled value={content ?? 'No content found for this code.'} className="whitespace-pre-wrap"/>
          </CardContent>
          <CardFooter>
            <Button variant="default"
              onClick={async () => {
                await navigator.clipboard.writeText(content ?? '')
                toast("Copied to clipboard!")
              }}
              disabled={!content}
            >
              <Copy />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}