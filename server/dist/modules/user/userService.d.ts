export declare const userService: {
    create: (name: string, email: string, hashedPassword: string) => Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        emailVerified: boolean;
        otpCode: string | null;
        otpExpiresAt: Date | null;
    }>;
    verifyOtp: (email: string, code: string) => Promise<{
        message: string;
    }>;
    loginService: (userId: string) => Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
};
//# sourceMappingURL=userService.d.ts.map