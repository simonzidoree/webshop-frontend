$(function listProducts()
{
    $.ajax({
        url: "https://superbeerapi.azurewebsites.net/api/products",
        type: 'GET',
        dataType: 'json',
        success: function (products)
        {
            onGetProductsSuccess(products);
        },
        error: function (request, message, error)
        {
            handleException(request, message, error);
        }
    });
});

function onGetProductsSuccess(products)
{
    if ($("#productsTable tbody").length == 0)
    {
        $("#productsTable").append("<tbody></tbody>");
    }
    $("#productsTable tbody").empty();
    // Iterate over the collection of data
    $.each(products, function (index, product)
    {
        // Add a row to the post table
        addProductRow(product);
    });
}

function addProductRow(product)
{
    // Check if <tbody> tag exists, add one if not
    // Append row to <table>
    $("#productsTable tbody").append(
        buildProductRow(product));
}

function buildProductRow(product)
{
    /** @namespace product.stock */
    /** @namespace product.price */
    let ret =
        "<tr>" +
        "<td class='small'>" + product.id + "</td>" +
        "<td class='small'>" + product.name + "</td>" +
        "<td class='small'>" + product.price + "</td>" +
        "<td class='small'>" + product.description + "</td>" +
        "<td class='small extend'>" + product.stock + "</td>" +
        "<td class='small'><img src='" + product.imageURL + "' alt='' height='100' width='50'></td>" +
        "</tr>";
    return ret;
}