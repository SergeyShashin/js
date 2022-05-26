function Container(idContainer, classContainer) {
  this.idContainer = idContainer;
  this.classContainer = classContainer;
}

Container.prototype.render = function () {
  var div = document.createElement('div');
  div.id = this.idContainer;
  div.className = this.classContainer;
}

function Menu(idContainer, classContainer, items) {
  Container.call(this, idContainer, classContainer);
  this.items = items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.render = function () {
  var ul = document.createElement('ul');
  ul.id = this.idContainer;
  ul.className = this.classContainer;

  this.items.forEach(function (item) {
    if (item instanceof Container) {
      ul.appendChild(item.render());
    }

  });

  return ul;
}

function MenuItem(href, label) {
  this.href = href;
  this.label = label;
  Container.call(this, 'idItem', 'classItem');
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.render = function () {
  var li = document.createElement('li');
  var a = document.createElement('a');
  li.id = this.idContainer;
  li.className = this.classContainer;
  a.href = this.href;
  a.textContent = this.label;
  li.appendChild(a);

  return li;
}

function SuperMenu(idContainer, classContainer, items, href, label) {
  Menu.call(this, idContainer, classContainer, items);
  this.href = href;
  this.label = label;
}

SuperMenu.prototype = Object.create(Menu.prototype);
SuperMenu.prototype.render = function () {
  if (this.href && this.label) {
    var ItemMenu = new MenuItem(this.href, this.label).render();
    ItemMenu.appendChild(Menu.prototype.render.call(this));

    return ItemMenu;

  } else {
    return Menu.prototype.render.call(this);
  }
}
