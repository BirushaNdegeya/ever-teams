import { IUser } from '@app/interfaces/IUserData';
import { authenticatedGuard } from '@app/services/server/guards/authenticated-guard-app';
import { getTaskCreator, updateUserAvatarRequest } from '@app/services/server/requests';
import { deleteUserRequest } from '@app/services/server/requests/user';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
	const res = new NextResponse();

	const { $res, user, access_token } = await authenticatedGuard(req, res);
	if (!user) return $res('Unauthorized');

	const { id: userId } = params;

	const { data } = await getTaskCreator({
		userId: userId as string,
		bearer_token: access_token
	});

	return $res(data);
}

export async function PUT(req: Request) {
	const res = new NextResponse();

	const { $res, user, access_token, tenantId } = await authenticatedGuard(req, res);
	if (!user) return $res('Unauthorized');

	const body = (await req.json()) as unknown as IUser;

	const response = await updateUserAvatarRequest(
		{
			data: body,
			id: user.id as string,
			tenantId
		},
		access_token
	);

	return $res(response.data);
}

export async function DELETE(req: Request) {
	const res = new NextResponse();

	const { $res, user, access_token, tenantId } = await authenticatedGuard(req, res);
	if (!user) return $res('Unauthorized');

	const response = await deleteUserRequest({
		id: user.id,
		bearer_token: access_token,
		tenantId
	});

	return $res(response.data);
}
