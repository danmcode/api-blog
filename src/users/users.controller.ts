import {
     Body,
     Controller,
     Delete,
     Get,
     Param,
     Post,
     Put,
     NotFoundException,
     UnprocessableEntityException,
     ForbiddenException
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';

interface User {
     id: string;
     name: string;
     email: string;
}

const EMAILREGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

@Controller('users')
export class UsersController {

     private users: User[] = [
          { id: '1', name: 'Sharon Doe', email: 'sharon.doe@example.com' },
          { id: '2', name: 'Daniel Doe', email: 'daniel.doe@example.com' },
          { id: '3', name: 'Alexander Doe', email: 'alexander.doe@example.com' },
     ];

     @Get()
     getUsers() {
          return this.users;
     }

     @Get(':id')
     findUser(@Param('id') id: string) {
          const user = this.users.find(user => user.id === id);

          if (!user) {
               throw new NotFoundException({
                    error: `User with id ${id} not found`,
               });
          }

          if (user.id === '1') {
               throw new ForbiddenException('You are not allowed to access this user');
          }

          return user;
     }

     @Post()
     createUser(@Body() body: CreateUserDto) {
          const id = `${new Date().getTime()}`;

          const newUser = {
               ...body,
               id,
          };

          this.users.push(newUser);
          return newUser;
     }

     @Delete(':id')
     deleteUser(@Param('id') id: string) {
          const position = this.users.findIndex((user) => user.id === id);
          if (position === -1) {
               throw new NotFoundException({
                    error: `User with id ${id} not found`,
               });
          }
          this.users.splice(position, 1);
          return {
               message: 'User deleted',
          };
     }

     @Put(':id')
     updateUser(
          @Param('id') id: string,
          @Body() changes: UpdateUserDto
     ) {
          const position = this.users.findIndex((user) => user.id === id);

          if (position === -1) {
               throw new NotFoundException({
                    error: `User with id ${id} not found`,
               });
          }

          const email = changes.email?.toLowerCase().trim();

          if (!email || !EMAILREGEX.test(email)) {
               throw new UnprocessableEntityException('Email is not valid');
          }

          const currentUser = this.users[position];

          const updatedUser = {
               ...currentUser,
               ...changes,
          };

          this.users[position] = updatedUser;

          return updatedUser;
     }
}