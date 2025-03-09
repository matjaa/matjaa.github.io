<?php

$luku1 = $_REQUEST["luku1"];

require "./yhteys.php";

if (filter_var($luku1, FILTER_VALIDATE_INT)) {

    $sql = "SELECT * FROM `character`
    INNER JOIN race
    on `character`.raceID = race.raceID
    INNER JOIN class
    on `character`.classID = class.classID WHERE `character`.`classID` LIKE '%$luku1%'";

    $stmt = $pdo->query($sql);
    $rows = $stmt->fetchAll();


    foreach($rows as $row){

    echo "<ul>";
    
        echo "<h2>". $row["name"] . "</h2>";
        echo "<li>class: " . $row["cname"] . "</li>";
        echo "<li>race: " . $row["rname"] . "</li>";
        echo "<li>str: " . $row["strength"] . "</li>";
        echo "<li>dex: " . $row["dexterity"] . "</li>";
        echo "<li>wis: " . $row["wisdom"] . "</li>";
        echo "<li>int: " . $row["intelligence"] . "</li>";
        echo "<li>hp: " . $row["hitpoints"] . "</li>";
    
    echo "</ul>";;
}
}
else {
   echo "Ei löydy!";
}

?>