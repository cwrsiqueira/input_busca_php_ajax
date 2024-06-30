<?php

/**
 * Fazer a conexão com o banco de dados
 */

$host = 'localhost';
$dbname = 'busca';
$user = 'root';
$pass = '';

try {
    $db = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
} catch (PDOException $e) {
    echo $e->getMessage();
}

/**
 * Buscar os dados no banco de dados
 */

$where = "";
$busca = filter_input(INPUT_GET, "busca", FILTER_DEFAULT);
if ($busca) {
    $where = "WHERE nome LIKE :nome";
}

$sql = $db->prepare("SELECT id, nome FROM nomes $where");
if ($busca) {
    $sql->bindValue(":nome", "%" . $busca . "%");
}
$sql->execute();
$data = $sql->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data);
