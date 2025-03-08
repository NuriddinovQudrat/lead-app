import jwt from 'jsonwebtoken';
import { type NextRequest, NextResponse } from 'next/server';

const SECRET_KEY = 'nuriddinovqudratjon';

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();
        if (username !== 'qudrat' || password !== '12345678') {
            return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
        }

        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '24h' });

        return NextResponse.json(
            {
                token,
            },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}
