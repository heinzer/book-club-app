export interface UserI {
  username: string;
  email?: string;
}
export class User implements UserI {
  email: string = "";
  username: string = "";
  constructor(username:string, email:string){
    this.email = email;
    this.username = username;
  }
}
// export class User {
//   constructor(
//     public email: string,
//     public username: string
//   ) { }
//
//   static parseUser(user:object) {
//     return new User(
//       user["email"],
//       user["username"]
//     );
//   }
// }
