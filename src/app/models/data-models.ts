export interface UserI {
  email?: string;
}
export class User implements UserI {
  email: string = "";
  constructor(email:string){
    this.email = email;
  }
}
// export class User {
//   constructor(
//     public email: string,
//   ) { }
//
//   static parseUser(user:object) {
//     return new User(
//       user["email"],
//     );
//   }
// }
