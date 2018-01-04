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
        var event = $('#carModal').attr('data-event');

        switch (event){
            case 'create':
                insertRow(tmpArray);
                break;
            case 'edit':
                var row = $('#carModal').attr('data-edit-row');
                editRow(tmpArray, row);
                break;
        }
        //Isvalome input laukus
        $('#distance').val('');
        $('#license-plate').val('');
        $('#time').val('');

        $('#carModal').modal('hide');
    });

    function insertRow(data) {
        var html = '';
        html = '<tr data-row = "' + listNumber + '">';
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

    function editRow(data, rowId){
        $('#list tbody tr[data-row=' + rowId + ']').find('td').eq(1).text(data[0]);
        $('#list tbody tr[data-row=' + rowId + ']').find('td').eq(2).text(data[1]);
        $('#list tbody tr[data-row=' + rowId + ']').find('td').eq(3).text(data[2]);
        $('#list tbody tr[data-row=' + rowId + ']').find('td').eq(4).text(data[3]);
    }

    $('body').on('click', '#list .edit', function () {
       var numeriai, atstumas, laikas;
       numeriai = $(this).closest('tr').children('td').eq(1).text();
       atstumas = $(this).closest('tr').children('td').eq(2).text();
       laikas = $(this).closest('tr').children('td').eq(3).text();

       $('#carModal').modal('show');
       $('#carModal').attr('data-event', 'edit');
       $('#carModal').attr('data-edit-row', $(this).closest('tr').attr('data-row'));

        $('#distance').val(atstumas);
        $('#license-plate').val(numeriai);
        $('#time').val(laikas);
    });
$('#carModal').on('hidden.bs.modal', function () {
    $('#distance').val('');
    $('#license-plate').val('');
    $('#time').val('');
    $('#carModal').attr('data-event', 'create');
    $('#carModal').attr('data-edit-row', 0);
});

    $('body').on('click', '#list .delete', function () {
        $('#deleteRow').modal('show');
        $('#deleteRow').attr('data-delete-row', $(this).closest('tr').attr('data-row'));
    });

    $('#deleteButton').on('click', function(){
        var rowId = $('#deleteRow').attr('data-delete-row');
        $('#list tbody tr[data-row=' + rowId + ']').remove();
        $('#deleteRow').modal('hide');
    });
});