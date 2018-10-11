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

function refreshProducts()
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
}

function removeProduct(productId)
{
    $.ajax({
        url: "https://superbeerapi.azurewebsites.net/api/products/" + productId,
        type: 'DELETE',
        success: function ()
        {
            refreshProducts();
        },
        error: function (request, message, error)
        {
            handleException(request, message, error);
        }
    });
}

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

$('#productsTable').on('click', '.btn.btn-danger', function ()
{
    var productId = $(this).closest("tr").find(".productId").text();
    removeProduct(productId);
});

$('#productsTable').on('click', '.btn.btn-info', function ()
{
    var productId = $(this).closest("tr").find(".productId").text();
    editProduct(productId);
});

function buildProductRow(product)
{
    /** @namespace product.stock */
    /** @namespace product.price */
    let ret =
        "<tr>" +
        "<td class='productId small'>" + product.id + "</td>" +
        "<td class='small'>" + product.name + "</td>" +
        "<td class='small'>" + product.price + "</td>" +
        "<td class='small'>" + product.description + "</td>" +
        "<td class='small extend'>" + product.stock + "</td>" +
        "<td class='small'><img src='" + product.imageURL + "' alt='' height='100' width='50'></td>" +
        "<td class='small'><button type='button' class='btn btn-info' id='editProduct'><i class='fas fa-pen fa-1x'></i></button></td>" +
        "<td class='small'><button type='button' class='btn btn-danger' id='removeProduct'><i class='fas fa-minus fa-1x'></i></button></td>" +
        "</tr>";
    return ret;
}

function editProduct(id) {
    window.open('../pages/editProduct.html?id=' + id);

}