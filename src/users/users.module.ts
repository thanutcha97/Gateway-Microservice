import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {UserServiceName} from "../microservice.name";
import {UserPort} from "../port";

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
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
