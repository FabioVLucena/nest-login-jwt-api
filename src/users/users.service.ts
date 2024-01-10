import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client'

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findByLogin(login: string): Promise<User | undefined> {
        return this.prisma.user.findUnique({
            where: {
                login: login
            }
        });
    }
    
}
