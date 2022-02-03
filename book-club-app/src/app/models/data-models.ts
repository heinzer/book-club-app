export interface UserI {
  email: string;
  username: string;
}
export class User implements UserI {
  email: string = "";
  username: string = "";
  constructor(email:string, username:string){
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
