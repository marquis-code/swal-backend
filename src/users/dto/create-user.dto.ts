// create-user.dto.ts
export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly phoneNumber?: string;
  readonly role?: string; // 'user', 'coach', 'admin'
}
