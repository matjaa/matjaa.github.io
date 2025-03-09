<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Hahmo</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="./style.css">
</head>
<body>

<?php
require "./yhteys.php";
?>

<h1>Lisää hahmo</h1>

<form method="post">
            <input type="text" placeholder="nimi" value="" name="name" /><br />

            <select name="classID" style="width:108px" >
            <?php
            $sql = "SELECT * FROM class";
            $stmt = $pdo->query($sql);
            $rows = $stmt ->fetchAll();

            foreach($rows as $row){
               $classid = $row["classID"];
               $name = $row["cname"];
               echo "<option value='$classid'>$name</option>";
            }
            ?>
            </select><br />
            <select name="raceID" style="width:108px" >
            <?php
            $sql = "SELECT * FROM race";
            $stmt = $pdo->query($sql);
            $rows = $stmt ->fetchAll();

            foreach($rows as $row){
               $raceid = $row["raceID"];
               $name = $row["rname"];
               echo "<option value='$raceid'>$name</option>";
            }
            ?>
            </select><br />

            <input type="number" min="1" max="18" placeholder="strength" name="strength" style="width:100px" /><br />
            <input type="number" min="1" max="18" placeholder="dexterity" name="dexterity" style="width:100px" /><br />
            <input type="number" min="1" max="18" placeholder="wisdom" name="wisdom" style="width:100px" /><br />
            <input type="number" min="1" max="18" placeholder="intelligence" name="intelligence" style="width:100px" /><br />
            <input type="number" min="1" max="100" placeholder="hitpoints" name="hitpoints" style="width:100px" /><br />
            <input type="submit" value="Lisää hahmo" /><br />
</form>
<br>

<?php

if(isset($_POST["name"], $_POST["classID"], $_POST["raceID"], $_POST["strength"], $_POST["dexterity"], $_POST["wisdom"], $_POST["intelligence"], $_POST["hitpoints"])){
    $data = array($_POST["name"], $_POST["classID"], $_POST["raceID"], $_POST["strength"], $_POST["dexterity"], $_POST["wisdom"], $_POST["intelligence"], $_POST["hitpoints"]);
    $sql = "INSERT INTO `character` (`name`, classID, raceID, strength, dexterity, wisdom, intelligence, hitpoints) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($data); 
}

$sql = "SELECT * FROM `character`
INNER JOIN race
    on `character`.raceID = race.raceID
INNER JOIN class
    on `character`.classID = class.classID";

$stmt = $pdo->query($sql);
$rows = $stmt->fetchAll();

echo"<h2>Lista hahmoista</h2>";

echo "<table id='myTable2' border='1'>";
echo "<tr><th
onclick=\"sortTable(0)\">name</th><th
onclick=\"sortTable(1)\">class</th><th
onclick=\"sortTable(2)\">race</th><th
onclick=\"sortTable(3)\">strength</th><th
onclick=\"sortTable(4)\">dexterity</th><th
onclick=\"sortTable(5)\">wisdom</th><th
onclick=\"sortTable(6)\">intelligence</th><th
onclick=\"sortTable(7)\">hitpoints</th></tr>";

foreach ($rows as $row) {
    echo "<tr>";
    echo "<td>" . $row["name"] . "</td>";
    echo "<td>" . $row["cname"] . "</td>";
    echo "<td>" . $row["rname"] . "</td>";
    echo "<td>" . $row["strength"] . "</td>";
    echo "<td>" . $row["dexterity"] . "</td>";
    echo "<td>" . $row["wisdom"] . "</td>";
    echo "<td>" . $row["intelligence"] . "</td>";
    echo "<td>" . $row["hitpoints"] . "</td>";
    echo "</tr>";
    
}
echo "</table>";
?>

<script>
   function haetiedot() {
 let luku1 = document.getElementById("luokka").value;
 var xmlhttp = new XMLHttpRequest();
 xmlhttp.onreadystatechange = function() {
 if (this.readyState == 4 && this.status == 200) {
 document.getElementById("txtTulos").innerHTML = this.responseText;
 }
 };
 xmlhttp.open("GET", "./haku.php?luku1=" + luku1, true);
 xmlhttp.send();
 }
 </script>


<div class="haut">
<div class="hakuluokka">
<h2>Etsi luokan perusteella</h2>
      <select id="luokka" onchange="haetiedot()">
      Class:
      <option value="1">Fighter</option>
      <option value="2">Wizard</option>
      <option value="3">Assassin</option>
   </select>
<h3>Kaikki hahmot</h3>
<p><span id="txtTulos"></span></p>

</div>
<div class="hakunimi">
<?php
echo "<h2>Hae hahmoa nimellä</h2>";
?>

<form method="post">
<input type="text" placeholder="Hahmon nimi" name="etsi">
<input type="submit" value="etsi hahmoa">
</form>

<?php
if(isset($_POST["etsi"])){

    $etsi = $_POST["etsi"];

    $sql = "SELECT * FROM `character`
    INNER JOIN race
    on `character`.raceID = race.raceID
    INNER JOIN class
    on `character`.classID = class.classID WHERE `character`.`name` LIKE '%$etsi%'";

    $stmt = $pdo->query($sql);
    $rows = $stmt->fetchAll();

    echo "<ul>";
    foreach($rows as $row){
        echo "<h2>". $row["name"] . "</h2>";
        echo "<li>class: " . $row["cname"] . "</li>";
        echo "<li>race: " . $row["rname"] . "</li>";
        echo "<li>str: " . $row["strength"] . "</li>";
        echo "<li>dex: " . $row["dexterity"] . "</li>";
        echo "<li>wis: " . $row["wisdom"] . "</li>";
        echo "<li>int: " . $row["intelligence"] . "</li>";
        echo "<li>hp: " . $row["hitpoints"] . "</li>";
    }
    echo "</ul>";

    }

?>
</div>
</div>
</body>
</html>