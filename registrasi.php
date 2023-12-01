<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$username = trim($data['username']);
$password = trim($data['password']);

http_response_code(201);
if ($username != '' and $password != '') {
    $query = mysqli_query($koneksi, "SELECT * FROM user WHERE username='$username'");
    if ($query and mysqli_num_rows($query) == 0) {
        $query = mysqli_query($koneksi, "INSERT INTO user (username, password) VALUES ('$username', '$password')");
        $pesan = true;
    } else {
        $pesan = false;
    }
} else {
    $pesan = false;
}
echo json_encode($pesan);
echo mysqli_error($koneksi);
