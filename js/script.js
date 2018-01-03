$(document).ready(function () {
    var listNumber = 1;

    $('#save').on('click',function () {
        var speed;

        //Pasiemame reiksmes is ivestu lauku
        var distance = parseInt($('#distance').val());
        var licensePlate = $('#license-plate').val();
        var time = parseInt($('#time').val());

        if(licensePlate == ''){
            alert('Dėmesio neįvestas laukelis "Automobilio valstybiniai numeriai"!');
            return;
        }

        if(isNaN(distance)){
            alert('Dėmesio neįvestas laukelis "Nuvažiuotas kelias"!');
            return;
        }

        if(isNaN(time)){
            alert('Dėmesio neįvestas laukelis "Sugaištas laikas"!');
            return;
        }

        //Paskaiciuojame greiti
        speed = (distance / 1000) / (time / 3600);
        //Suapvaliname skaiciu
        speed = speed.toFixed(2);

        //Sukuriame laikina masyva ivestu duomenu saugojimui
        var tmpArray = [];

        tmpArray = [licensePlate, distance, time, speed];

        //Iterpiame nauja eilute su ivestais duomenimis
        insertRow(tmpArray);

        //Isvalome input laukus
        $('#distance').val('');
        $('#license-plate').val('');
        $('#time').val('');

        $('#carForm').modal('hide');
    });
    
    function insertRow(data) {
        var html = '';
        html = '<tr>';
        html += '<td>' + listNumber + '</td>';
        for(var i = 0; i < data.length; i++){
            html += '<td>' + data[i] + '</td>';
        }
        html +='<td><button class="btn btn-primary edit" type="button" title="Redaguoti"><i class="fas fa-pencil-alt"></i></button>';
        html +='<button class="btn btn-danger delete" type="button" title="Trinti"><i class="fas fa-trash"></i></button></td>';
        html += '</tr>';

        listNumber++;

        $('#list tbody').append(html);
    }

    $('body').on('click', '#list .edit', function () {
       var numeriai, atstumas, laikas;
       numeriai = $(this).parent('tr').find('td:nth-child(1)');

    });

});