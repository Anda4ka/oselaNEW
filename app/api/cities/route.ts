import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET() {
    try {
        const filePath = join(process.cwd(), 'public', 'cities-ua.json')
        const data = readFileSync(filePath, 'utf-8')
        return new NextResponse(data, {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=86400',
            },
        })
    } catch {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
}
