import type {
	FullMiracleData,
	FullOurLadyData,
	FullSaintWithData,
	MiracleTableType,
	OurLadyTableType,
	RoleEnum,
	SaintTableType,
	UserDataTableType
} from '$lib/utils/types/general-types';

type PermissionCheck<Key extends keyof Permissions> =
	| boolean
	| ((user: UserDataTableType, data: Permissions[Key]['dataType']) => boolean);

type RolesWithPermissions = {
	[R in RoleEnum]: Partial<{
		[Key in keyof Permissions]: Partial<{
			[Action in Permissions[Key]['action']]: PermissionCheck<Key>;
		}>;
	}>;
};

type Permissions = {
	miracles: {
		dataType: MiracleTableType | FullMiracleData;
		action: 'view' | 'create' | 'update' | 'delete' | 'approve';
	};
	saints: {
		dataType: SaintTableType | FullSaintWithData;
		action: 'view' | 'create' | 'update' | 'delete' | 'approve';
	};
	ourLady: {
		dataType: OurLadyTableType | FullOurLadyData;
		action: 'view' | 'create' | 'update' | 'delete' | 'approve';
	};
	userData: {
		dataType: UserDataTableType;
		action: 'view' | 'create' | 'update' | 'delete'; // Todo: add denial coverage here
	};
};

const ROLES = {
	admin: {
		miracles: {
			view: true,
			create: true,
			update: true,
			delete: true,
			approve: true
		},
		saints: {
			view: true,
			create: true,
			update: true,
			delete: true,
			approve: true
		},
		ourLady: {
			view: true,
			create: true,
			update: true,
			delete: true,
			approve: true
		},
		userData: {
			view: true,
			create: true,
			update: true,
			delete: true
		}
	},
	editor: {
		miracles: {
			view: true,
			create: true,
			update: true,
			delete: false,
			approve: false
		},
		saints: {
			view: true,
			create: true,
			update: true,
			delete: false,
			approve: false
		},
		ourLady: {
			view: true,
			create: true,
			update: true,
			delete: false,
			approve: false
		},
		userData: {
			view: true,
			create: true,
			update: true,
			delete: false
		}
	},
	user: {
		miracles: {
			view: true,
			create: true,
			update: (user: UserDataTableType, miracles: MiracleTableType) =>
				miracles.created_by === user.supabase_id,
			delete: (user: UserDataTableType, miracles: MiracleTableType) =>
				miracles.created_by === user.supabase_id
		},
		saints: {
			view: true,
			create: true,
			update: (user: UserDataTableType, saints: SaintTableType) =>
				saints.created_by === user.supabase_id,
			delete: (user: UserDataTableType, saints: SaintTableType) =>
				saints.created_by === user.supabase_id
		},
		ourLady: {
			view: true,
			create: true,
			update: (user: UserDataTableType, ourLady: OurLadyTableType) =>
				ourLady.created_by === user.supabase_id,
			delete: (user: UserDataTableType, ourLady: OurLadyTableType) =>
				ourLady.created_by === user.supabase_id
		},
		userData: {
			view: true,
			create: false,
			update: false,
			delete: false
		}
	}
} as const satisfies RolesWithPermissions;

export function hasPermission<Resource extends keyof Permissions>(
	user: UserDataTableType,
	resource: Resource,
	action: Permissions[Resource]['action'],
	data?: Permissions[Resource]['dataType']
) {
	const permission = (ROLES as RolesWithPermissions)[user.role][resource]?.[action];
	if (permission == null) return false;

	if (typeof permission === 'boolean') return permission;
	return data != null && permission(user, data);
}

// Can create a comment
// hasPermission(user, "comments", "create")

// Can view the `todo` Todo
// hasPermission(user, "todos", "view", todo)

// Can view all todos
// hasPermission(user, "todos", "view")