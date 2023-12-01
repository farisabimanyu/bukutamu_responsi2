<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input, true);
//terima data dari mobile
$nama = trim($data['nama']);
$keperluan = trim($data['keperluan']);
http_response_code(201);
if ($nama != '' and $keperluan != '') {
    $query = mysqli_query($koneksi, "insert into bukutamu(nama,keperluan) values('$nama','$keperluan')");
    $pesan = true;
} else {
    $pesan = false;
}
echo json_encode($pesan);
echo mysqli_error($koneksi);
