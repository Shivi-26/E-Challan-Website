$("#add_user").submit(function (event) {
    alert("Data inserted successfully");
})

$("#payment").submit(function (event) {
    alert("Payment successfully😍");
})


$("#challan").submit(function (event) {
    alert("challaninserted successfully");
})


$("#update_user").submit(function (event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value']
    })

    console.log(data);

    var request = {
        "url": `http://localhost:4000/api/users/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function (response) {
        alert("Data updated successfully")
    })
})

if(window.location.pathname=="/admin_home"){
    $ondelete=$(".table tbody td a.delete");
    $ondelete.click(function(){
        var id=$(this).attr("data-id")

        var request = {
            "url": `http://localhost:4000/api/users/${id}`,
            "method": "DELETE",
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function (response) {
                alert("Data deleted successfully")
                location.reload();
            })
        }
    })
}