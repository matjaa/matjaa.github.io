<?php

$dsn = 'mysql:dbname=20jaamat;host=localhost';
$user = '20jaamat';
$password = 'salasana';

try {
    $pdo = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

?>