import { Body, Controller, Post, HttpCode, HttpStatus, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './constants';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto.login, signInDto.password);
    }
    
    @Public()
    @Post('register')
    @HttpCode(HttpStatus.OK)
    signUp(@Body() signInDto: SignInDto) {
        return this.authService.signUp(signInDto.login, signInDto.password);
    }

    @Get('profile')
    @HttpCode(HttpStatus.OK)
    getProfile(@Request() req) {
        return req.user;
    }
}