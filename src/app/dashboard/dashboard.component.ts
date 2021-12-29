import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  state = {
    userdata: JSON.parse(`${this.getCookie('_lgd_sa')}`),
    datahistory: null,
  }

  constructor() {
    if ( this.getCookie('_lgd_sa') === null ) {
      window.location.href = '/login'
    }
  }

  ngOnInit(): void {
    this.getSaldoHistory()
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

  async getSaldoHistory(){
    let GetHistoryData = await fetch('/dev/saldo/history', { headers: { 'Authorization': `Bearer ${ this.state.userdata.token }` } })
    .then(response => response.json()).catch(err => false)
    if ( !GetHistoryData ) {
      alert('failed to get history data')
    } else {
      this.state.datahistory = GetHistoryData.results
    }
  }
}
