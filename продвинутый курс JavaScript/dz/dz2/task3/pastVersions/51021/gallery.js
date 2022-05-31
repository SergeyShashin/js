var data_img = [
    {
        "id": "1",
        "name": "1.png",
        "smallSize": "img/small/1.png",
        "fullSize": "img/full/1.png"
    },
    {
        "id": "2",
        "name": "2.png",
        "smallSize": "img/small/2.png",
        "fullSize": "img/full/2.png"
    },

];

function Gallery(id_image, name, hrefSmallSize, hrefFullSize) {
    this.id_image = id_image;
    this.name = name;
    this.hrefSmallSize = hrefSmallSize;
    this.hrefFullSize = hrefFullSize;
}

Gallery.prototype.render = function () {    
    var li = document.createElement('li');    
    var a = document.createElement('a');
    var img = document.createElement('img');

    a.href = this.hrefFullSize;
    img.src = this.hrefSmallSize;
    img.id = this.id_image;
    img.alt = this.name;

    a.appendChild(img);
    li.appendChild(a);

    return li;
}