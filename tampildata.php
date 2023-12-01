<?php

require "koneksi.php";

$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Terima data dari mobile
$username = trim($data['username']);

http_response_code(201);

$data = [];
$query = mysqli_query($koneksi, "SELECT * FROM user_bukutamu JOIN bukutamu ON bukutamu.id = user_bukutamu.id_bukutamu WHERE username='$username';");
while ($row = mysqli_fetch_object($query)) {
    $data[] = $row;
}

// Tampilkan data dalam bentuk json
echo json_encode($data);
echo mysqli_error($koneksi);
