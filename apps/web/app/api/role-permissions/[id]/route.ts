import { authenticatedGuard } from '@app/services/server/guards/authenticated-guard-app';
import { getRolePermissionsRequest, updateRolePermissionRequest } from '@app/services/server/requests';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
	const res = new NextResponse();
	const { $res, user, access_token, tenantId } = await authenticatedGuard(req, res);

	if (!user) return $res('unauthorized');

	const { id } = params;

	const response = await getRolePermissionsRequest({
		bearer_token: access_token,
		tenantId,
		roleId: id as string
	});

	return $res(response.data);
}

export async function PUT(req: Request) {
	const res = new NextResponse();
	const { $res, user, access_token, tenantId } = await authenticatedGuard(req, res);

	if (!user) return $res('unauthorized');

	const body = await req.json();

	const response = await updateRolePermissionRequest({
		bearer_token: access_token,
		tenantId,
		data: body
	});

	return $res(response.data);
}
