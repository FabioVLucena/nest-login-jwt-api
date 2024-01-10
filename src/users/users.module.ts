import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [UsersService],
  imports: [DatabaseModule],
  exports: [UsersService],
})
export class UsersModule {}
