$(function getProductById()
{
    $.ajax({
        url: "https://superbeerapi.azurewebsites.net/api/products/" + getUrlParameter('id'),
        type: 'GET',
        dataType: 'json',
        success: function (product)
        {
            addProductDetails(product);
        }
    });
});

function addProductDetails(product)
{
    $(buildProductDetails(product)).appendTo(
        $(".wrapper"));
}

function buildProductDetails(product)
{
    /** @namespace product.stock */
    /** @namespace product.price */
    let ret =
        "<div class='tekst'><h1>Andre kunder har også set på dette:</h1></div>" +
        "        <div class='panel tall-panel'>" +
        "            <div id='box5'><h3>" + product.stock + "</h3></div>" +
        "            <div class='product_img_detail'>" +
        "                <img src='" + product.imageURL + "' alt=''>" +
        "            </div>" +
        "        </div>" +
        "        <div class='panel tall-panel'>" +
        "            <h1>" + product.name + "</h1>" +
        "            <div id='box6'><h2>Tilføj til kurv " + product.price + ",- kr.</h2></div>" +
        "            <p>" + product.description + "</p>" +
        "        </div>" +
        "        <div class='panel'><h4>Grimbergen Blonde</h4>" +
        "            <div class='product_img_detail2'>" +
        "                <img src='grimbergen-blonde.png' alt=''>" +
        "            </div>" +
        "        </div>" +
        "        <div class='panel'><h4>Køb ølglas</h4>" +
        "            <div class='product_img_detail3'>" +
        "                <img src='image.png' alt=''>" +
        "            </div>" +
        "        </div>" +
        "        <div id='line'></div>";
    return ret;
}

function getUrlParameter(sParam)
{
    let sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++)
    {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam)
        {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}