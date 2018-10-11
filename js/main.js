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
    // Iterate over the collection of data
    $.each(products, function (index, product)
    {
        // Add a product to the post table
        addProduct(product);
    });
}

function addProduct(product)
{
    $(buildProductRow(product)).appendTo(
        $(".productsView"));

    addSeeMoreProductsButton();
}

function buildProductRow(product)
{
    /** @namespace product.stock */
    /** @namespace product.price */
    let ret =
        "<div class='product'>" +
        "<div class='product_img'>" +
        "<img src='" + product.imageURL + "' alt=''>" +
        "</div>" +
        "<h1>" + product.name + "</h1>" +
        "<h2>" + product.price + "</h2>" +
        "</div>";
    return ret;
}

function addSeeMoreProductsButton()
{
    $(" #product_see_more ").appendTo($(" .productsView "));
}

function handleException(request, message, error)
{
    var msg = "";
    msg += "Code: " + request.status + "\n";
    msg += "Text: " + request.statusText + "\n";
    if (request.responseJSON != null)
    {
        msg += "Message" +
            request.responseJSON.Message + "\n";
    }
    alert(msg);
}