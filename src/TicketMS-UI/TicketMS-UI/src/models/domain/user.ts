import { Role } from "./role";

export class User {
    Id: number;
    Email: string;
    UserName: string;
    TelegramId?: string;
    Role: Role = new Role();
}
