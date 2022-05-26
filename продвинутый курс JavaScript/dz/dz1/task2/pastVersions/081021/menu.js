function CreateHtmlElement(name) {
  this.name = name;
}

CreateHtmlElement.prototype.render = function () {
  return document.createElement(this.name);
}


function Container(my_id, my_class) {
  this.my_id = my_id;
  this.my_class = my_class;
}

Container.prototype.render = function () {
  var div = new CreateHtmlElement('div').render();
  div.id = this.my_id;
  div.className = this.my_class;

  return div;
}

function Menu(my_id, my_class, items) {
  Container.call(this, my_id, my_class);

  this.items = items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.render = function () {
  var ul = new CreateHtmlElement('ul').render();
  ul.id = this.my_id;
  ul.className = this.className;

  this.items.forEach(function (item) {
    if (item instanceof Container) {
      ul.appendChild(item.render());
    }
  })

  return ul;
}

function MenuItem(href, label) {
  Container.call(this, 'idItem', 'classItem');
  this.href = href;
  this.label = label;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.render = function () {
  var li = new CreateHtmlElement('li').render();
  var a = new CreateHtmlElement('a').render();
  li.id = this.my_id;
  li.className = this.my_class;
  a.href = this.href;
  a.textContent = this.label;
  li.appendChild(a);

  return li;
}

function SuperMenu(my_id, my_class, items, href, label) {
  Menu.call(this, my_id, my_class, items);
  this.href = href;
  this.label = label;
}

SuperMenu.prototype = Object.create(Menu.prototype);
SuperMenu.prototype.render = function () {
  if (this.href && this.label) {
    var item = new MenuItem(this.href, this.label).render();
    item.appendChild(Menu.prototype.render.call(this));
    return item;

  } else {
    return Menu.prototype.render.call(this);
  }
}