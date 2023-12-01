import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bukutamu',
  templateUrl: './bukutamu.page.html',
  styleUrls: ['./bukutamu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class BukutamuPage implements OnInit {
  dataBukutamu: any = [];
  modal_tambah = false;
  modal_edit = false;
  username: any;
  id_bukutamu: any;
  nama: any;
  keperluan: any;

  constructor(public _apiService: ApiService, private modal: ModalController, private route: Router) { }

  ngOnInit() {
    this.isLogin();
  }

  isLogin = async () => {
    const { value } = await Preferences.get({ key: 'username' });
    if (value == null) {
      this.route.navigate(['/login']);
    } else {
      this.username = value;
    }
    this.getBukutamu();
  };

  logout = async () => {
    await Preferences.remove({ key: 'username' });
    this.isLogin();
  };

  getBukutamu() {
    let data = {
      username: this.username
    }
    this._apiService.tampil(data, "tampildata.php").subscribe({
      next: (res: any) => {
        console.log("sukses", res);
        this.dataBukutamu = res;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  reset_model() {
    this.id_bukutamu = null;
    this.keperluan = "";
  }

  open_modal_tambah(isOpen: boolean) {
    this.modal_tambah = isOpen;
    this.reset_model();
    this.modal_tambah = true;
    this.modal_edit = false;
  }

  open_modal_edit(isOpen: boolean, idget: any) {
    this.modal_edit = isOpen;
    this.id_bukutamu = idget;
    console.log(this.id_bukutamu);
    this.ambilBukutamu(this.id_bukutamu);
    this.modal_tambah = false;
    this.modal_edit = true;
  }

  cancel() {
    this.modal.dismiss();
    this.modal_tambah = false;
    this.reset_model();
  }

  ambilBukutamu(id: any) {
    this._apiService.lihat(id, "/lihatdata.php?id=").subscribe({
      next: (hasil: any) => {
        console.log("sukses", hasil);
        let bukutamu = hasil;
        this.id_bukutamu = bukutamu.id;
        this.nama = bukutamu.nama;
        this.keperluan = bukutamu.keperluan;
      },
      error: (error: any) => {
        console.log("Gagal ambil data");
      }
    })
  }

  tambahBukutamu() {
    if (this.nama != "" && this.keperluan != "") {
      let data = {
        username: this.username,
        nama: this.nama,
        keperluan: this.keperluan,
      }
      this._apiService.post(data, "tambahdata.php").subscribe({
        next: (hasil: any) => {
          this.reset_model();
          console.log("Berhasil tambah bukutamu");
          this.getBukutamu();
          this.modal_tambah = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log("Gagal tambah bukutamu");
        }
      });
    } else {
      console.log("Gagal tambah bukutamu");
    }
  }

  editBukutamu() {
    let data = {
      id: this.id_bukutamu,
      nama: this.nama,
      keperluan: this.keperluan
    }
    this._apiService.edit(data, "/editdata.php").subscribe({
      next: (hasil: any) => {
        console.log(hasil);
        this.reset_model();
        this.getBukutamu();
        console.log("Berhasil edit bukutamu");
        this.modal_edit = false;
        this.modal.dismiss();
      },
      error: (err: any) => {
        console.log("Gagal edit bukutamu");
      }
    })
  }

  hapusBukutamu(id: any) {
    this._apiService.hapus(id, "/hapusdata.php?id=").subscribe({
      next: (res: any) => {
        console.log("sukses", res);
        this.getBukutamu();
        console.log("Berhasil hapus data");
      },
      error: (error: any) => {
        console.log("Gagal");
      }
    })
  }
}