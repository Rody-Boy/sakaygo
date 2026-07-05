import type { Role } from '@/types';import { users } from '@/mock/users';import { delay } from '@/lib/utils';
export class AuthService{static async continueAs(role:Role){await delay(350);const user=users.find(u=>u.role===role)??users[0];return user}}
