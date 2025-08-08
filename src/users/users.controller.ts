import { Controller, Get } from '@nestjs/common';

interface User {
     id: number;
     name: string;
     email: string;
}

@Controller('users')
export class UsersController {

     private users: User[] = [
          { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
          { id: 2, name: 'John Doe', email: 'john.doe@example.com' },
          { id: 3, name: 'John Doe', email: 'john.doe@example.com' },
     ];

     @Get()
     getUsers() {
          return this.users;
     }
}
