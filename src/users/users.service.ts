import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {UpdatePassword, UserInterface} from "./interface/user.interface";
import {lastValueFrom} from "rxjs";

@Injectable()
export class UsersService {

  constructor(@Inject('USERS') private readonly userServices: ClientProxy) {}

  async create(data: UserInterface) {
    const user = await this.userServices.send(
        { cmd: 'user_create' },
        data,
    );
    return user;
  }

  async getUsers() {
    const users = await this.userServices.send({ cmd: 'get_users' }, {});
    return users;
  }

  async findByUsername( username : string) {
    const users = await this.userServices.send({ cmd: 'find_username' }, username );
    return users;
  }

  async getnewUsers() {
    const users = await this.userServices.send({ cmd: 'get_new_users' }, {});
    return users;
  }

  async update(id: string, data : UserInterface) {
    const result = await this.userServices.send({ cmd: 'update_users' }, { id , data} );
    return result ;
  }

  async remove(id: string) {
    const result = await this.userServices.send({ cmd: 'delete_users' }, id );
    return result ;
  }

  async blockUser(id: string) {
    const result = await this.userServices.send({ cmd: 'block_users' }, id );
    return result ;
  }

  async unblockUser(id: string) {
    const result = await this.userServices.send({ cmd: 'unblock_users' },  id );
    return  result ;
  }

  async updatePassword(id: string , password : UpdatePassword) {
    const result = await this.userServices.send({ cmd: 'update_password' }, { id , password} );
    return  result ;
  }

  async getUsername( username : string){
    console.log('Username Here', username)
    const resutl$ = this.userServices.send({ cmd: 'get_username' }, username )
    const result = await lastValueFrom(resutl$);
    return  result ;
  }

  async userPurchaseBook(id : string) {
    const result = await this.userServices.send({ cmd: 'user_purchase_book' }, id );
    return result ;
  }
}
