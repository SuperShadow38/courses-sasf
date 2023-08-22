export class LoginI {
    username?:string;
    password?:string;

    constructor ( Username: string, password: string ) {

        this.username = Username;
        this.password = password;

    }
}