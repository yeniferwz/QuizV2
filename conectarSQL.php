<?php
$servername = "localhost";
$username = "a21yenwuwzha_user";
$password = "A21yenwuwzha";
$dbname = "a21yenwuwzha_quiz";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM PREGUNTES";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while ($row = $result->fetch_assoc()) {
        echo "idPregunta: " . $row["preguntaID"] . " - pregunta: " . $row["pregunta"] . "<br>";
    }
} else {
    echo "0 results";
}
$conn->close();