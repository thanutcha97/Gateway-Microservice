import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {BookServiceName} from "../microservice.name";
import {BookPort} from "../port";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: BookServiceName,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: BookPort,
        },
      },
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
