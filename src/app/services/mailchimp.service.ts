import { Injectable } from '@angular/core';
declare function require(name:string): any;
const mailchimpTx = require("@mailchimp/mailchimp_transactional")("3b60730a93b9dc322837e60ae24b887d-us1");

@Injectable({
  providedIn: 'root'
})
export class MailchimpService {

  constructor() { }


  run(): void {
    const response = mailchimpTx.users.ping();
    console.log(response);
  }
}
