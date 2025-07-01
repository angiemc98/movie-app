import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from 'src/dto/register.dto';
import { LoginDto } from 'src/dto/login.dto';


@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async register(registerDto: RegisterDto) {
        const user = await this.userService.create(registerDto);

        //Generar token JWT
        const payload = {email: user.email, sub: user.id};
        const token = this.jwtService.sign(payload);

        return {
            message: 'User registered successfully',
            user: {
                id: user.id,
                email: user.email,
            },
            token,
        };
    }    

        async login(LoginDto: LoginDto) {
            const { email, password } = LoginDto;

            //Buscar usuario por email
            const user = await this.userService.findByEmail(email);
            if (!user) {
                throw new Error('User not found');
            }

            //Validar contraseña
            const isPasswordValid = await this.userService.validatePassword(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }

            //Generar token JWT
            const payload = { email: user.email, sub: user.id };
            const token = this.jwtService.sign(payload);
            
            return {
                message: 'Login successful',
                user: {
                    id: user.id,
                    email: user.email,
                },
                token,
            };
    };
}

