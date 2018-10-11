$('#myForm').on('submit', function (e)
{
    e.preventDefault();
    var name = $("#productName").val();
    var price = $("#productPrice").val();
    var description = $("#productDescription").val();
    var stock = $("#productStock").val();
    var imageURL = $("#productImageURL").val();

    // In my case, I need to fetch these data before custom actions
    $.ajax({
        url: "https://superbeerapi.azurewebsites.net/api/products",
        type: 'POST',
        data: JSON.stringify({
            "name": name,
            "price": price,
            "description": description,
            "stock": stock,
            "imageURL": imageURL
        }),
        processData: false,
        contentType: 'application/json',
        success: function (comments)
        {
            console.log("Product " + name + " has been successfully created.");
        },
        error: function (request, message, error)
        {
            handleException(request, message, error);
        }
    });
});