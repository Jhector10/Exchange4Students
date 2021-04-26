import { Injectable } from '@angular/core';
declare function require(name:string): any;
const mailchimpTx = require("@mailchimp/mailchimp_transactional")("bqdLn-ZGdNXorUrNjVlKnA");

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
