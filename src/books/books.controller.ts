import {Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards} from '@nestjs/common';
import { BooksService } from './books.service';
import {CreateBoook, PurchaseBook} from "./interface/books.interface";
import {UserInterface} from "../users/interface/user.interface";
import {RolesGuard} from "../auth/role.guard";
import Role from "../auth/role.enum";
import {Roles} from "../auth/roles.decorator";


@Controller('books')
export class BooksController {

  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBoook) {
    return this.booksService.create(createBookDto);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() bookData : CreateBoook) {
    return this.booksService.update(id, bookData);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }

  @Get('type/:name')
  sortbyType(@Param('name') name : string) {
    return this.booksService.sortbytype(name);
  }

  @Get('price/:select')
  sortbyPrice(@Param('select') select : string) {
    return this.booksService.sortbyprice(select);
  }

  @Get('amount/:select')
  sortbyAmount(@Param('select') select : string) {
    return this.booksService.sortbyamount(select);
  }

  @Get('low_in_stock')
  lowInstock( ) {
    return this.booksService.lowInstock();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.User)
  @Post('buy_book')
  buyBook(@Request() req, @Body() data: PurchaseBook) {
    console.log(req.user)
    console.log(data)
    return this.booksService.buyBook( req.user , data);
  }

  @Get('low_in_stock/:name')
  reportPurhaseBookType(@Param('name') name : String) {
    return this.booksService.reportPurhaseBookType(name);
  }

  @Get('ranking/books')
  bookRanking() {
    return this.booksService.bookRanking();
  }

  @Get('ranking/users')
  userRanking() {
    return this.booksService.userRanking();
  }

  @Get('ranking/users/:id')
  userRankingId(@Param('id') id : string) {
    return this.booksService.userRankingId(id);
  }

  @Get('purchase/user/amount')
  getPurchaseUserDate(){
    return this.booksService.getPurchaseUserDate();
  }


  @Get('purchase/books/lastdate/:id')
  userPurchaseBookLastdate(@Param('id') id : string) {
    return this.booksService.userPurchaseBookLastdate(id);
  }

}