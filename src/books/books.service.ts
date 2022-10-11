import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {CreateBoook, PurchaseBook} from "./interface/books.interface";
import {UserInterface} from "../users/interface/user.interface";

@Injectable()
export class BooksService {

  constructor(@Inject('BOOKS') private readonly bookServices: ClientProxy) {}

  async create(data: CreateBoook) {
    const user = await this.bookServices.send({ cmd: 'books_create' }, data);
    return user;
  }

  async update(id: string, bookData : CreateBoook) {
    const result = await this.bookServices.send({ cmd: 'update_books' }, { id , bookData} );
    return result ;
  }

  async remove(id: string) {
    const result = await this.bookServices.send({ cmd: 'delete_books' }, id );
    return result ;
  }

  async sortbytype(name: string) {
    const result = await this.bookServices.send({ cmd: 'sort_by_type' }, name );
    return result ;
  }

  async sortbyprice(select: string) {
    const result = await this.bookServices.send({ cmd: 'sort_by_price' }, select );
    return result ;
  }

  async sortbyamount(select : string) {
    const result = await this.bookServices.send({ cmd: 'sort_by_amount' }, select );
    return result ;
  }

  async lowInstock() {
    const result = await this.bookServices.send({ cmd: 'low_in_stock' }, {} );
    return result ;
  }

  async buyBook( user , data: PurchaseBook) {
    const result = await this.bookServices.send({ cmd: 'buy_book' }, {user , data}  );
    return result ;
  }

  async reportPurhaseBookType( name ) {
    const result = await this.bookServices.send({ cmd: 'report_purchase_book_type' }, name  );
    return result ;
  }

  async bookRanking() {
    const result = await this.bookServices.send({ cmd: 'ranking_books' },{});
    return result ;
  }

  async userRanking() {
    const result = await this.bookServices.send({ cmd: 'ranking_users' },{});
    return result ;
  }

  async userRankingId(id) {
    const result = await this.bookServices.send({ cmd: 'ranking_users_id' }, id );
    return result ;
  }

  async getPurchaseUserDate() {
    const result = await this.bookServices.send({ cmd: 'get_purchase_user_data' }, {} );
    return result ;
  }

  async userPurchaseBookLastdate( id : string) {
    const result = await this.bookServices.send({ cmd: 'last_date' }, id );
    return result ;
  }
}

