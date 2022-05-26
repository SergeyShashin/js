function Container(my_id, my_class) {
    this.my_id = my_id;
    this.my_class = my_class;  
}

Container.prototype.render = function () {
    var div = document.createElement('div');
    div.id = my_id;
    div.className = my_class;

    return div;
}

function Menu(my_id, my_class, my_items) {
    Container.call(this, my_id, my_class);
    this.my_items = my_items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.render = function () {
    var ul = document.createElement('ul');
    ul.id = this.my_id;
    ul.className = this.my_class;

    this.my_items.forEach(function (my_item) {
        if (my_item instanceof Container) {
            ul.appendChild(my_item.render());
        }
    })

    return ul;
}

function MenuItem(href, label) {
    Container.call(this, 'id', 'class');
    this.href = href;
    this.label = label;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.render = function () {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = this.href;
    a.textContent = this.label;
    li.appendChild(a);

    return li;
}

function SuperMenu(my_id, my_class, my_Items, my_href, my_label) {
    Menu.call(this, my_id, my_class, my_Items);
    this.my_href = my_href;
    this.my_label = my_label;
}

SuperMenu.prototype = Object.create(Menu.prototype);
SuperMenu.prototype.render = function () {
    if (this.my_href && this.my_label) {
        var menuItem = new MenuItem(this.my_href, this.my_label).render();
        menuItem.appendChild(Menu.prototype.render.call(this));
        return menuItem;
    } else {
        return Menu.prototype.render.call(this);
    }
}
