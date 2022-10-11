import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from "../users/users.service";
import { AuthInterface } from "./interface/auth.interface";
import * as dayjs from 'dayjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly UsersService: UsersService,
        private JwtService: JwtService,
    ) {}

    private saltOrRounds = 10;
    private passwordIsWrong = [];


    async signIn(userData: AuthInterface, ip: String): Promise<Object> {
        let query = {
            username: userData.username,
        };
        let user = await this.UsersService.getUsername(query.username);

        // หาตำแหน่งข้อมูลผู้ใช้ล็อคอินผิดโดยไอพี
        let userLogIndex = this.passwordIsWrong.findIndex(
            (element) => element.ip === ip,
        );
        if (userLogIndex != -1 && this.passwordIsWrong[userLogIndex].count >= 3) {
            const user = this.passwordIsWrong[userLogIndex];
            let lastDate = dayjs().format();
            if (user.count == 3 && lastDate < user.date) {
                let date1 = dayjs(lastDate);
                let date2 = dayjs(user.date);
                return {
                    message: 'Block',
                    second: `Count down second: ${date2.diff(date1, 'second')}`,
                };
            }

            if (user.count == 3 && lastDate > user.date) {
                this.passwordIsWrong.splice(userLogIndex, 1);
                userLogIndex = -1;
            }
        }
        if (user) {
            let isValidPassword = await bcrypt.compare(
                userData.password,
                user.password,
            );
            if (isValidPassword) {
                const payload = {
                    username: user.username,
                    id: user._id.toString(),
                    role: user.role,
                };
                let token = this.JwtService.sign(payload);
                return { token: token };
            } else {
                if (userLogIndex == -1) {
                    this.passwordIsWrong.push({
                        ip: ip,
                        count: 1,
                        date: null,
                    });
                    throw new HttpException(
                        'Invalid Password',
                        HttpStatus.BAD_REQUEST,
                    );
                }
                this.passwordIsWrong[userLogIndex].count += 1;
                if (this.passwordIsWrong[userLogIndex].count == 3) {
                    this.passwordIsWrong[userLogIndex].date = dayjs()
                        .add(30, 'second')
                        .format();
                    return {
                        message: 'Block Request 30 second',
                    };
                }
            }
        } else {
            if (userLogIndex == -1) {
                this.passwordIsWrong.push({
                    ip: ip,
                    count: 1,
                    date: null,
                });
                throw new HttpException(
                    'Invalid username',
                    HttpStatus.BAD_REQUEST,
                );
            }
            this.passwordIsWrong[userLogIndex].count += 1;

            if (this.passwordIsWrong[userLogIndex].count == 3) {
                this.passwordIsWrong[userLogIndex].date = dayjs()
                    .add(30, 'second')
                    .format();
                return {
                    message: 'Block Request 30 second',
                };
            }
        }
        if(user == null) {
            throw new HttpException(
                'Invalid username',
                HttpStatus.BAD_REQUEST,
            );
        }
        throw new HttpException(
            'Invalid password',
            HttpStatus.BAD_REQUEST,
        );

}
    checkUserIsWrong() {

    }

}


