<?php
    session_start();

    $arr_correctIndex=$_SESSION["arr_correctIndex"];
    $info_quiz = file_get_contents("Quizz.json");
    $quiz = json_decode($info_quiz);
    $estado = json_decode($_POST["dades"]);

    //estado es l'objecte tuPartida del fitxer funcionesJuego.js
    $num_total = $estado -> num_respuesta;
    $num_correctes = 0;
    
    for($i=0;$i< $estado->num_respuesta ;$i++){
        if($estado->v_respuestas[$i] == $arr_correctIndex[$i]){$num_correctes++;}
    }

    $arr = array('totalR' => $estado->num_respuesta, 'correctes' => $num_correctes);
    echo json_encode($arr);
?>