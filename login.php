<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$username = trim($data['username']);
$password = trim($data['password']);

http_response_code(201);
if ($username != '' and $password != '') {
    $query = mysqli_query($koneksi, "SELECT * FROM user WHERE username='$username' and password='$password'");
    if ($query and mysqli_num_rows($query) == 1) {
        $akun = mysqli_fetch_assoc($query);
        $pesan = $akun['id_user'];
    } else {
        $pesan = false;
    }
} else {
    $pesan = false;
}
echo json_encode($pesan);
echo mysqli_error($koneksi);
