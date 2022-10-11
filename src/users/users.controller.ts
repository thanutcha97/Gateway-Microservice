import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import {UpdatePassword, UserInterface} from "./interface/user.interface";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() data : UserInterface) {
    return this.usersService.create(data);
  }

  @Get('users')
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('users/:username')
  findByUsername(@Param('username') username : string ) {
    return this.usersService.findByUsername(username);
  }

  @Get('new_users')
  getnewUsers() {
    return this.usersService.getnewUsers();
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() data: UserInterface) {
    return this.usersService.update(id, data);
  }


  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Patch('block_user/:id')
  blockUser(@Param('id') id: string) {
    return this.usersService.blockUser(id);
  }

  @Patch('unblock_user/:id')
  unblockUser(@Param('id') id: string) {
      return this.usersService.unblockUser(id);
  }

  @Patch('update_password/:id')
  updatePassword(@Param('id') id: string , @Body() password : UpdatePassword) {
    return this.usersService.updatePassword( id , password );
  }

  @Get('purchase_books/:id')
  userPurchaseBook(@Param('id') id : string) {
    return this.usersService.userPurchaseBook(id);
  }




}
