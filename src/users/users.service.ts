/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { table } from 'console';
import { json } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { USERS } from './users.mock';

@Injectable()
export class UsersService {
  users = USERS;

  /* private users: User[] = [{"username": "Hector", "email":"hector.giudatto@gmail.com", "password":"th3s3cr3t&&p1ll"}]; */
  private idSeq = 0;
  // TODO: Refactor Promises -> https://youtu.be/4RkMAt8-u8g
  // TODO: Mongo DB
  create(createUserDto: CreateUserDto) {
    this.users.push({ ...createUserDto });    
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    const u = this.users.findIndex((user) => user.id == id);
    if (u === -1) return null;
    this.users[u] = {
      ...this.users[u],
      ...updateUserDto,
    };
    return this.users[u];
  }

  remove(id: number): User {
    const u = this.users.findIndex((user) => user.id == id);
    if (u === -1) return null;
    const user = this.users[u];
    this.users.splice(u, 1);
    return user;
  }
}
