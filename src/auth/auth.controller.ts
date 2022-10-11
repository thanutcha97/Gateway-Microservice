import {Controller, Ip, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthInterface} from "./interface/auth.interface";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() signIn: AuthInterface, @Ip() ip) {
    return this.authService.signIn(signIn, ip);
  }
}
