// src/guards/admin.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const user = request.user as { role?: string };
        
        if (user?.role !== 'admin') {
            throw new ForbiddenException('Apenas administradores podem acessar este recurso');
        }
        
        return true;
    }
}