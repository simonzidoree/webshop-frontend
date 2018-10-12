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
            refreshSuccessAlert();
        },
        error: function (request, message, error)
        {
            handleException(request, message, error);
        }
    });
}

function refreshSuccessAlert()
{
    $(".refreshSuccessAlert").show();
    setTimeout(function ()
    {
        $(".refreshSuccessAlert").hide();
    }, 5000);
}

function removedProductAlert()
{
    $(".removedProductAlert").show();
    setTimeout(function ()
    {
        $(".removedProductAlert").hide();
    }, 5000);
}

function removeProduct(productId)
{
    $.ajax({
        url: "https://superbeerapi.azurewebsites.net/api/products/" + productId,
        type: 'DELETE',
        success: function ()
        {
            refreshProducts();
            removedProductAlert();
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
        "<td class='productId small td-alignment-center'>" + product.id + "</td>" +
        "<td class='small'>" + product.name + "</td>" +
        "<td class='small td-alignment-center'>" + product.price + "</td>" +
        "<td class='small extend td-alignment-left'>" + product.description + "</td>" +
        "<td class='small td-alignment-center'>" + product.stock + "</td>" +
        "<td class='small td-alignment-center product_img'><img src='" + product.imageURL + "' alt='' height='100' width='100'></td>" +
        "<td class='small td-alignment-center'>" +
        "<button type='button' class='btn btn-sm btn-info' id='editProduct'>" +
        "<i class='fas fa-pen' style='font-size: 15px; text-align: center; vertical-align: middle;'></i>" +
        "</button></td>" +
        "<td class='small td-alignment-center'>" +
        "<button type='button' class='btn btn-sm btn-danger' id='removeProduct'>" +
        "<i class='fas fa-times' style='font-size: 20px; text-align: center; vertical-align: middle;'></i>" +
        "</button></td>" +
        "</tr>";
    return ret;
}

function editProduct(id)
{
    window.location.href = '../pages/editProduct.html?id=' + id;

}