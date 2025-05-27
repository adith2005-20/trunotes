"use client"

import React from 'react'
import { api } from '@/trpc/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { stripHtml } from '@/lib/utils'
import Link from 'next/link'

interface Note {
  id: string
  title: string
  contentPreview: string
  updatedAt: Date | null
}

const NotePreviews = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
      } = api.note.retrieveAll.useInfiniteQuery(
        {
          limit: 10,
        },
        {
          getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
      )
      
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>   
      {data?.pages.map((page, index) => (
        <div key={index} className='flex flex-col gap-4'>
          {page.notes.map((note: Note) => (
            <Link href={`/notes/edit/${note.id}`} key={note.id}>
              <Card className='bg-background'>
                <CardHeader>
                  <CardTitle className='text-lg'>{note.title}</CardTitle>
                </CardHeader> 
                <CardContent>
                  <p className='line-clamp-2'>
                    {stripHtml(String(note.contentPreview ?? 'No content'))}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    {note.updatedAt?.toLocaleString() ?? 'No date'}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}

export default NotePreviews