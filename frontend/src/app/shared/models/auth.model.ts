export interface RegisterPayload {
	email: string;
	password: string;
	confirmPassword: string;
	username: string;
	roles?: string;
}

export interface RegisterResponse {
	success: boolean;
	message: string;
	status: string;
	data: {
		user: {
			id: any;
			username: string;
			email: string;
			createdAt: string;
			roles?: string;
		}
	}
}

export interface UserLoggedInProfile {
	id: any;
	username: string;
	email: string;
	roles: string;
	createdAt: string
}

export interface LoginPayload {
	email: string;
	password: string;
}

export interface LoginResponse {
	success: boolean;
	message: string;
	token: string;
	user: UserLoggedInProfile
}


