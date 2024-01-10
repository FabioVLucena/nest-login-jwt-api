import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(login: string, password: string): Promise<any> {
        const user = await this.usersService.findByLogin(login);
        // IF USER NOT FOUND
        if (user == null) {
            throw new UnauthorizedException();
        }

        // IF PASSWORD NOT MATCH
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, login: user.login };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    
    async signUp(login: string, password: string): Promise<any> {
        const existLogin = await this.usersService.findByLogin(login);

        if (existLogin) {
            throw new BadRequestException("Login in use");
        }
        
        // ENCRYPT PASSWORD
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        const user = await this.usersService.create(login, hash);
        
        const payload = { sub: user.id, login: user.login };
    
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

}
