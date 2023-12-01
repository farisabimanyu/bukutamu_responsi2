import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-tamu',
    templateUrl: './tamu.page.html',
    styleUrls: ['./tamu.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule]
})
export class BukutamuPage implements OnInit {

    // constructor() { 
    //   Public _apiService: ApiService;
    //   Private modal:ModalController;
    // }
    constructor(public _apiService: ApiService, private modal: ModalController) { };
    modal_edit = false;
    modal_tambah = false;
    dataTamu: any = [];
    id: any;
    nama: any;
    keperluan: any;

    ngOnInit() {
        this.getBukutamu();
    }
    getBukutamu() {
        this._apiService.tampil('tampildata.php').subscribe({
            next: (res: any) => {
                console.log('sukses', res);
                this.dataTamu = res;
            },
            error: (err: any) => {
                console.log(err);
            },
        })
    }
    reset_model() {
        this.id = null;
        this.nama = '';
        this.keperluan = '';
    }
    cancel() {
        this.modal.dismiss();
        this.modal_tambah = false;
        this.reset_model();
    }
    tambahMahasiswa() {
        if (this.nama != '' && this.keperluan != '') {
            let data = {
                nama: this.nama,
                keperluan: this.keperluan,
            }
            this._apiService.tambah(data, 'tambahdata.php').subscribe({
                next: (hasil: any) => {
                    this.reset_model();
                    console.log('berhasil tambah tamu');
                    this.getBukutamu();
                    this.modal_tambah = false;
                    this.modal.dismiss();
                },
                error: (err: any) => {
                    console.log('gagal tambah tamu');
                }
            })
        }
        else {
            console.log('gagal tambah tamu karena masih ada data yg kosong');
        }
    }
    hapusBukutamu(id: any) {
        this._apiService.hapus(id, 'hapusdata.php?id=').subscribe({
            next: (res: any) => {
                console.log('sukses', res);
                this.getBukutamu();
                console.log('berhasil hapus data');
            },
            error: (error: any) => {
                console.log('gagal');
            }
        })
    }
    ambilBukutamu(id: any) {
        this._apiService.lihat(id, 'lihatdata.php?id=').subscribe({
            next: (hasil: any) => {
                console.log('sukses', hasil);
                let tamu = hasil;
                this.id = tamu.id;
                this.nama = tamu.nama;
                this.keperluan = tamu.keperluan;
            },
            error: (error: any) => {
                console.log('gagal ambil data');
            }
        })
    }
    open_modal_tambah(isOpen: boolean) {
        this.modal_tambah = isOpen;
        this.reset_model();
        this.modal_tambah = true;
        this.modal_edit = false;
    }
    open_modal_edit(isOpen: boolean, idget: any) {
        this.modal_edit = isOpen;
        this.id = idget;
        console.log(this.id);
        this.ambilBukutamu(this.id);
        this.modal_tambah = false;
        this.modal_edit = true;
    }
    editBukutamu() {
        let data = {
            id: this.id,
            nama: this.nama,
            keperluan: this.keperluan
        }
        this._apiService.edit(data, 'editdata.php').subscribe({
            next: (hasil: any) => {
                console.log(hasil);
                this.reset_model();
                this.getBukutamu();
                console.log('berhasil edit Bukutamu');
                this.modal_edit = false;
                this.modal.dismiss();
            },
            error: (err: any) => {
                console.log('gagal edit Bukutamu');
            }
        })
    }
}