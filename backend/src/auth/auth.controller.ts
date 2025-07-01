import { Body, Controller, Post, UseGuards, ValidationPipe, Get, Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from 'src/dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register (@Body(ValidationPipe) registerDto: RegisterDto) {
        return await this.authService.register(registerDto);
    }

    @Post('login')
    async login(@Body(ValidationPipe) LoginDto: LoginDto) {
        return await this.authService.login(LoginDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req: { user: { id: number; email: string } }){ 
        return {
            message: 'User profile retrieved successfully',
            user: req.user
        };
    }    
}