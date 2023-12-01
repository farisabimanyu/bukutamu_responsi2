<?php
require 'koneksi.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$id_user = trim($data['id_user']);

http_response_code(201);

$data = [];
$query = mysqli_query($koneksi, "select * from bukutamu WHERE id_user='$id_user'");
while ($row = mysqli_fetch_object($query)) {
    $data[] = $row;
}

echo json_encode($data);
echo mysqli_error($koneksi);
