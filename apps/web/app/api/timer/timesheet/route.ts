import { authenticatedGuard } from '@app/services/server/guards/authenticated-guard-app';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	const res = new NextResponse();
	const { $res, user } = await authenticatedGuard(req, res);
	if (!user) return $res('unauthorized');
}
