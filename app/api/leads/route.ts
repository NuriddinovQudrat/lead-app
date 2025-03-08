import { type NextRequest, NextResponse } from 'next/server';

const leads: any[] = [
    // {
    //     id: 1,
    //     first_name: 'Qudratjon',
    //     last_name: 'Nuriddinov',
    //     email: 'qudratjonnuriddinov2603@gmail.com',
    //     linkedin: 'https://www.linkedin.com/in/nuriddinovqudratjon',
    //     citizenship: 'Uzbekistan',
    //     visas: ['0-1'],
    //     additional: 'TEST',
    //     status: 'pending',
    //     created_at: new Date().toISOString(),
    // },
    // {
    //     id: 2,
    //     first_name: 'Qudratjon2',
    //     last_name: 'Nuriddinov2',
    //     email: 'qudratjonnuriddinov2603@gmail.com',
    //     linkedin: 'https://www.linkedin.com/in/nuriddinovqudratjon',
    //     citizenship: 'Uzbekistan',
    //     visas: ['0-1'],
    //     additional: 'TEST',
    //     status: 'reached_out',
    //     created_at: new Date().toISOString(),
    // },
];

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

export async function PUT(request: NextRequest) {
    try {
        const { id, status } = await request.json();

        if (!id || !status || !['pending', 'reached_out'].includes(status)) {
            return NextResponse.json({ error: 'Invalid data or status' }, { status: 400 });
        }

        const lead = leads.find(lead => lead.id === id);

        if (!lead) {
            return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
        }

        lead.status = status;
        return NextResponse.json({ success: true, lead });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update lead status' }, { status: 500 });
    }
}
