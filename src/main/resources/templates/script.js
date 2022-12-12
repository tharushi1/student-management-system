var selectedRow = null;

function onFormSubmit(e){
    event.preventDefault();
//    var formData = readFormData();
//     if(selectedRow === null){
//            create(formData);
//        }
//        else{
//            update(formData);
//        }
//        resetForm();
    var request ={};
      request.id = document.getElementById("id").value;
       request.firstName = document.getElementById("firstname").value;
        request.lastName = document.getElementById("lastname").value;
        request.nic = parseInt(document.getElementById("nic").value);
        request.department= document.getElementById("department").value;
        request.email= document.getElementById("email").value;


    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: 'http://localhost:8080/create',
      data: JSON.stringify(request),
      async:false,
      crossDomain: true,
    })
      .done(function (data) {
        console.log('done');
        draw();
      })
      .fail(function (xhr, textStatus, errorThrown) {
              console.error(xhr);

            });



    // $.post("http://localhost:8080/cars",
    //  formData,
    //  function(data, status){
    //    alert("Data: " + data + "\nStatus: " + status);
    //  });
    //    $.ajax({
    //      method: "POST",
    //      url: "http://localhost:8080/cars",
    //      dataType: "application/json",
    //      data:
    //    });
//    if(selectedRow === null){
//        create(formData);
//    }
//    else{
//        update(formData);
//    }
    resetForm();
}
function draw(){
$('#tbody').children('tr').remove();
   $.ajax({
      type: 'GET',
      contentType: 'application/json',
      url: 'http://localhost:8080/all',
      crossDomain: true,
    })
      .done(function (data) {
        console.log(data);

        $.each(data, function(i, elem){
        create(elem);
        });

      })
      .fail(function (xhr, textStatus, errorThrown) {
        console.error(xhr);
      });

}

//Retrieve the data
function readFormData(){
    var formData = {};
	formData["id"] = document.getElementById("id").value;
    formData["firstname"] = document.getElementById("firstname").value;
    formData["lastname"] = document.getElementById("lastname").value;
    formData["nic"] = document.getElementById("nic").value;
    formData["department"] = document.getElementById("department").value;
    formData["email"] = document.getElementById("email").value;
    return formData;
}

//Insert the data
function create(data){
    var table = document.getElementById("stu").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
	var cell1 = newRow.insertCell(0);
        cell1.innerHTML = data.id;
    var cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.firstName;
    var cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.lastName;
    var cell4 = newRow.insertCell(3);
        cell4.innerHTML = data.nic;
    var cell5 = newRow.insertCell(4);
        cell5.innerHTML = data.department;
    var cell6 = newRow.insertCell(5);
        cell6.innerHTML = data.email;
    var cell7 = newRow.insertCell(6);
       cell7.innerHTML = '<button  onClick="onEdit(this)" >Edit</button> <button  onClick="onDelete('+data.id+')">Delete</button>';
}

//Edit the data
function onEdit(td){

    selectedRow = td.parentElement.parentElement;
	document.getElementById('id').value = selectedRow.cells[0].innerHTML;
    document.getElementById('firstname').value = selectedRow.cells[1].innerHTML;
    document.getElementById('lastname').value = selectedRow.cells[2].innerHTML;
    document.getElementById('nic').value = selectedRow.cells[3].innerHTML;
    document.getElementById('department').value = selectedRow.cells[4].innerHTML;
    document.getElementById('email').value = selectedRow.cells[5].innerHTML;
}


function update(formData){
	selectedRow.cells[0].innerHTML = formData.id;
    selectedRow.cells[1].innerHTML = formData.firstname;
	selectedRow.cells[2].innerHTML = formData.lastname;
    selectedRow.cells[3].innerHTML = formData.nic;
    selectedRow.cells[4].innerHTML = formData.department;
    selectedRow.cells[5].innerHTML = formData.email;
}

//Delete the data
function onDelete(id){

      if (confirm('Are you sure to delete this record ?')) {
              $.ajax({
                type: 'DELETE',
                contentType: 'application/json',
                url: 'http://localhost:8080/delete/'+id,
                crossDomain: true,
              })
                .done(function (data) {
                  console.log('done');
                  draw();
                })
                .fail(function (xhr, textStatus, errorThrown) {
               console.error(xhr);
                });


    }
    resetForm();
}

//Reset the data
function resetForm(){
	document.getElementById('id').value = "";
    document.getElementById('firstname').value = "";
    document.getElementById('lastname').value = "";
    document.getElementById('nic').value = "";
    document.getElementById('department').value = "";
    document.getElementById('email').value = "";
}