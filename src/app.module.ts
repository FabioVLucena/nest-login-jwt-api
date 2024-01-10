import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TesteModule } from './teste/teste.module';

@Module({
  imports: [
    AuthModule, 
    UsersModule, TesteModule
  ]
})
export class AppModule {}
