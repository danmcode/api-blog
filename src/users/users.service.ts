import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {

     private users: User[] = [
          { id: '1', name: 'Sharon Doe', email: 'sharon.doe@example.com' },
          { id: '2', name: 'Daniel Doe', email: 'daniel.doe@example.com' },
          { id: '3', name: 'Alexander Doe', email: 'alexander.doe@example.com' },
     ];

     findAll(): User[] {
          return this.users;
     }

     getUserById(id: string): User {
          const position = this.findOne(id);
          const user = this.users[position];
          if (user.id === '1') {
               throw new ForbiddenException('You are not allowed to access this user');
          }
          return user;
     }

     create(user: CreateUserDto): User {
          const id = `${new Date().getTime()}`;
          const newUser = {
               ...user,
               id,
          };
          this.users.push(newUser);
          return newUser;
     }

     update(id: string, changes: UpdateUserDto): User {
          const position = this.findOne(id);
          const user = this.users[position];

          this.users[position] = {
               ...user,
               ...changes,
          };

          return this.users[position];
     }

     delete(id: string): { message: string } {
          const position = this.findOne(id);
          this.users.splice(position, 1);
          return { message: 'User deleted' };
     }

     private findOne(id: string): number {
          const position = this.users.findIndex((user) => user.id === id);
          if (position === -1) {
               throw new NotFoundException({
                    error: `User with id ${id} not found`,
               });
          }
          return position;
     }

}
