import { Body, Controller, Post, HttpCode, HttpStatus, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './constants';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }
    
    @Public()
    @Post('register')
    @HttpCode(HttpStatus.OK)
    signUp(@Body() signInDto: Record<string, any>) {
        return this.authService.signUp(signInDto.username, signInDto.password);
    }

    @Get('profile')
    @HttpCode(HttpStatus.OK)
    getProfile(@Request() req) {
        return req.user;
    }
}