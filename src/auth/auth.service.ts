import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(login: string, pass: string): Promise<any> {
        const user = await this.usersService.findByLogin(login);

        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, login: user.login };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
