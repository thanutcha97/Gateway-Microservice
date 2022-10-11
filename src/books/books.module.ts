import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {BookServiceName} from "../microservice.name";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: BookServiceName,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002,
        },
      },
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
