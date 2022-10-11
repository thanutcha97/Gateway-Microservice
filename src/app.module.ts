import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ClientsModule, Transport} from "@nestjs/microservices";
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ClientsModule.register([
          {
            name: 'USERS',
            transport: Transport.TCP,
            options: {
                host: 'localhost',
                port: 3001,
            },
          },
        {
            name: 'BOOKS',
            transport: Transport.TCP,
            options: {
                host: 'localhost',
                port: 3002,
            },
        }
          ]),
    UsersModule,
    BooksModule,
    AuthModule
      ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
