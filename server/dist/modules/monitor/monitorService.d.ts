type CreateMonitorInput = {
    url: string;
    name?: string;
    intervalMin?: number;
    userId: string;
};
export declare const monitorService: {
    create: ({ url, name, intervalMin, userId }: CreateMonitorInput) => Promise<{
        id: string;
        name: string | null;
        url: string;
        intervalMin: number;
        createdAt: Date;
        userId: string;
    }>;
    getAll: (userId: string) => Promise<{
        id: string;
        name: string | null;
        url: string;
        intervalMin: number;
        createdAt: Date;
        userId: string;
        latestCheck: {
            id: string;
            statusCode: number;
            responseMs: number;
            checkedAt: Date;
            monitorId: string;
        } | undefined;
        uptimePercent: number;
        avgResponseMs: number;
        checkResults: {
            id: string;
            statusCode: number;
            responseMs: number;
            checkedAt: Date;
            monitorId: string;
        }[];
    }[]>;
    getById: (id: string, userId: string) => Promise<{
        checkResults: {
            id: string;
            statusCode: number;
            responseMs: number;
            checkedAt: Date;
            monitorId: string;
        }[];
    } & {
        id: string;
        name: string | null;
        url: string;
        intervalMin: number;
        createdAt: Date;
        userId: string;
    }>;
    deleteById: (id: string, userId: string) => Promise<{
        id: string;
        name: string | null;
        url: string;
        intervalMin: number;
        createdAt: Date;
        userId: string;
    }>;
};
export {};
//# sourceMappingURL=monitorService.d.ts.map