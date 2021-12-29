import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  state = {
    saldo: '',
    userdata: JSON.parse(`${this.getCookie('_lgd_sa')}`)
  }

  constructor() {
    this.tester()
  }

  ngOnInit() {

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

  formatRupiah(angka: string, prefix: string){
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
        split   		= number_string.split(','),
        sisa     		= split[0].length % 3,
        rupiah     	= split[0].substr(0, sisa),
        ribuan     	= split[0].substr(sisa).match(/\d{3}/gi);

    if(ribuan){
      var separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
  }

  async tester() {
    console.log(this.state.userdata)
    let DataSaldo = await fetch('/dev/saldo', { headers: { 'Authorization': `Bearer ${ this.state.userdata.token }` } })
    .then(response => response.json()).catch(err => false)
    this.state.saldo = DataSaldo ? this.formatRupiah(DataSaldo.saldo.toString(), 'Rp. ') : this.formatRupiah('0', 'Rp. ')
  }
}
