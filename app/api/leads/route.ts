import { type NextRequest, NextResponse } from 'next/server';

// In a real application, this would connect to a database
// For this demo, we'll use an in-memory store
const leads: any[] = [];

export async function GET() {
    return NextResponse.json({ leads });
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        // Process form data
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;
        const email = formData.get('email') as string;
        const linkedinProfile = formData.get('linkedinProfile') as string;
        const visasOfInterest = formData.getAll('visasOfInterest') as string[];
        const resume = formData.get('resume') as File;
        const additionalInfo = formData.get('additionalInfo') as string;

        // Validate required fields
        if (
            !firstName ||
            !lastName ||
            !email ||
            !linkedinProfile ||
            visasOfInterest.length === 0 ||
            !resume
        ) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Create a new lead
        const newLead = {
            id: Date.now().toString(),
            firstName,
            lastName,
            email,
            linkedinProfile,
            visasOfInterest,
            resumeFilename: resume.name,
            additionalInfo: additionalInfo || '',
            status: 'PENDING',
            createdAt: new Date().toISOString(),
        };

        // For this demo, we'll just add it to our in-memory array
        leads.push(newLead);

        return NextResponse.json({ success: true, lead: newLead });
    } catch (error) {
        console.error('Error creating lead:', error);
        return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
    }
}
