<?php
header('Content-Type: application/json');
$jsonFile = __DIR__ . '/livros_a_ler.json';

if(!file_exists($jsonFile)){
    file_put_contents($jsonFile, json_encode([]));
}

$livros = json_decode(file_get_contents($jsonFile), true);
if (!is_array($livros)) {
    $livros = [];
}

$input = json_decode(file_get_contents('php://input'), true);
if(!$input){
    echo json_encode(["status"=>"erro", "mensagem"=>"Dados inválidos"]);
    exit;
}

$livros[] = $input;

if(file_put_contents($jsonFile, json_encode($livros, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))){
    echo json_encode(["status"=>"sucesso", "mensagem"=>"Livro adicionado"]);
} else {
    echo json_encode(["status"=>"erro", "mensagem"=>"Falha ao gravar"]);
}
?>
