import { type NextRequest, NextResponse } from 'next/server';

// In a real application, this would connect to a database
// For this demo, we'll use an in-memory store
const leads: any[] = [];

export async function GET() {
    return NextResponse.json({ leads });
}

export async function POST(request: NextRequest) {
    try {
        const { first_name, last_name, email, citizenship, linkedin, visas, additional } =
            await request.json();

        if (
            !first_name ||
            !last_name ||
            !email ||
            !citizenship ||
            !linkedin ||
            visas.length === 0
        ) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newLead = {
            id: Date.now().toString(),
            first_name,
            last_name,
            email,
            linkedin,
            citizenship,
            visas,
            additional: additional || '',
            status: 'pending',
            created_at: new Date().toISOString(),
        };

        leads.push(newLead);

        return NextResponse.json({ success: true, lead: newLead });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
    }
}
