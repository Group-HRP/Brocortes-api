import { Strategy } from 'passport-jwt';
import { PrismaClient } from '@prisma/client';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaClient);
    validate(payload: any): Promise<{
        name: string;
        email: string;
        password: string;
        role: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
