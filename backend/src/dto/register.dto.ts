import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterDto {
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty({ message: 'password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}
