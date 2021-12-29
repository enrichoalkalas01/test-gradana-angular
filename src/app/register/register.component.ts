import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() {
    if ( this.getCookie('_lgd_sa') !== null ) {
      window.location.href = '/'
    }
  }

  ngOnInit(): void { }

  getCookie(name: string) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  async RegisterData() {
    let config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: (<HTMLInputElement>document.getElementById("username")).value,
        password: (<HTMLInputElement>document.getElementById("password")).value,
        fullname: (<HTMLInputElement>document.getElementById("fullname")).value,
        email: (<HTMLInputElement>document.getElementById("email")).value,
        age: (<HTMLInputElement>document.getElementById("age")).value,
        no_hp: (<HTMLInputElement>document.getElementById("no_hp")).value,
      }), 
    }

    let GetResponse = await fetch('/dev/register', config)
    .then(response => response.json()).catch(err => false)

    if ( !GetResponse ) {
      alert('failed to register the data')
    } else {
      if ( GetResponse.statusCode !== 406 ) {
        alert('successfull to register data')
        window.location.href = '/login'
      } else {
        alert(GetResponse.message)
      }
    }
  }
}
