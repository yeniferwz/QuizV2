<?php
    session_start();

   //var_dump($_GET['n']);

    //url+"?num=? + doc.getelementbyid.("num").value;
    $info_quiz = file_get_contents("Quizz.json");
    $quiz = json_decode($info_quiz);

    $_SESSION["arr_questions"] = array();
    $arr_questions = $_SESSION["arr_questions"];
    //var_dump($quiz);
    $num_preguntes = htmlentities($_GET['n']);
    $_SESSION["preguntes"] = $num_preguntes;

    //treure un vector amb numeros randoms
    //arr_questions[] --> 1,3,5,6,8 un vector que guarda els valors randoms
    $j=0;
    do{
        $random_index = rand(0,$_SESSION["preguntes"] - 1);
        if(!in_array($random_index, $arr_questions)){
            $arr_questions[] = $random_index;
            $j++;
        }
    }while($j < $_SESSION["preguntes"]);

    $_SESSION["arr_questions"] = $arr_questions;

    //generar els dos vectors de preguntes i resposted amb index corresponent
    $arr_answers = [];
    $arr_correctIndex= [];
   
    for($i = 0; $i < $_SESSION["preguntes"]; $i++){
        $arr_answers[] = [$quiz[$arr_questions[$i]]->answers[0] , $quiz[$arr_questions[$i]]->answers[1] , $quiz[$arr_questions[$i]]->answers[2]  ,$quiz[$arr_questions[$i]]->answers[3]];
        $arr_correctIndex[]=$quiz[$arr_questions[$i]]->correctIndex;
        $arr_questions[$i]= array('question' => $quiz[$arr_questions[$i]]->question, 'answers' => $arr_answers[count($arr_answers)-1]);
     
    }
    
    $_SESSION["arr_correctIndex"]=$arr_correctIndex;
 
    echo json_encode($arr_questions);    
?>