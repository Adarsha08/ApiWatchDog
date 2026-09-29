export declare const checkResult: {
    create: ({ monitorId, statusCode, responseMs }: {
        monitorId: string;
        statusCode: number;
        responseMs: number;
    }) => Promise<{
        id: string;
        statusCode: number;
        responseMs: number;
        checkedAt: Date;
        monitorId: string;
    }>;
};
//# sourceMappingURL=checkResultService.d.ts.map