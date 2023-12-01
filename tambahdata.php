<?php

require "koneksi.php";

$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Terima data dari mobile
$username = trim($data["username"]);
$nama = trim($data["nama"]);
$keperluan = trim($data["keperluan"]);

http_response_code(201);

if ($nama != "" and $keperluan != "") {
    $query = mysqli_query($koneksi, "INSERT INTO bukutamu(nama, keperluan) VALUES('$nama', '$keperluan')");
    $last_id = mysqli_insert_id($koneksi);
    $query = mysqli_query($koneksi, "INSERT INTO user_bukutamu(username, id_bukutamu) VALUES('$username', $last_id)");
    $pesan = true;
} else {
    $pesan = false;
}

echo json_encode($pesan);
echo mysqli_error($koneksi);
