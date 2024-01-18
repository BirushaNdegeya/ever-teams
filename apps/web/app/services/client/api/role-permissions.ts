import { IRolePermissions, PaginationResponse } from '@app/interfaces/';
import { get, put } from '../axios';
import { getTenantIdCookie } from '@app/helpers';

export function getRolePermissionAPI(id: string) {
	const tenantId = getTenantIdCookie();

	const params = {
		data: JSON.stringify({
			findInput: {
				roleId: id,
				tenantId
			}
		})
	};
	const query = new URLSearchParams(params);

	return get<PaginationResponse<IRolePermissions>>(`/role-permissions/${id}?${query.toString()}`);
}

export function updateRolePermissionAPI(data: IRolePermissions) {
	return put<IRolePermissions>(`/role-permissions/${data.id}`, data);
}
