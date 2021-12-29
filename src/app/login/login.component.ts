import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor() {
    if ( this.getCookie('_lgd_sa') !== null ) {
      window.location.href = '/'
    }
  }

  ngOnInit(): void { }
  
  setCookie(name: string, value: string, days: string) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (Number(days) * 24 * 60 * 60 *1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }

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

  async SubmitButton() {
    let config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: (<HTMLInputElement>document.getElementById("username")).value,
        password: (<HTMLInputElement>document.getElementById("password")).value,
      }), 
    }

    
    let GetResponse = await fetch('/dev/login', config).then(response => response.json()).catch(err => false)

    if ( !GetResponse ) {
      alert('failed to login data')
    } else {
      console.log(GetResponse)
        if ( GetResponse.statusCode !== 406 ) {
          console.log(GetResponse)
          this.setCookie('_lgd_sa', JSON.stringify(GetResponse.result), '1')
          alert('successfull to login data')
          window.location.href = '/'
        } else {
          alert(GetResponse.message)
        }
    }
  }
}
