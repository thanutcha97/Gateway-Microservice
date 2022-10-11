import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ClientsModule, Transport} from "@nestjs/microservices";
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { BookServiceName,UserServiceName} from "./microservice.name";
import {BookPort, UserPort} from "./port";

@Module({
  imports: [
    ClientsModule.register([
          {
            name: UserServiceName ,
            transport: Transport.TCP,
            options: {
                host: 'localhost',
                port: UserPort,
            },
          },
        {
            name: BookServiceName,
            transport: Transport.TCP,
            options: {
                host: 'localhost',
                port: BookPort,
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
