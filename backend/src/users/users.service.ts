import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDto } from '../dto/register.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(RegisterDto: RegisterDto): Promise<User> {
        const { email, password } = RegisterDto;

        //Verificar existencia de usuario.
        const existingUser = await this.usersRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('User already exists');
        }

        //Encriptar contraseña
        const salts = 10;
        const hashedPassword = await bcrypt.hash(password, salts);

        //Crear y guardar el nuevo usuario
        const user = this.usersRepository.create({
            email,
            password: hashedPassword,
        });
        return this.usersRepository.save(user);
    }
    async findByEmail(email: string): Promise<User | null> {
        return await this.usersRepository.findOne({ where: { email } });
    }

    async findById(id: number): Promise<User | null> {
        return await this.usersRepository.findOne({ where: { id } });
    }

    async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}
