'use strict';

// 2. Создать наследника класса Menu – новый класс должен уметь строить меню со вложенными пунктами,
//  т.е с подменю. Подсказка: главный секрет – в обходе объекта пунктов меню и проверке типов.

function Container(id, className) {
  this.id = id;
  this.className = className;
}


Container.prototype.render = function () {
  var div = document.createElement('div');

  div.id = this.id;
  div.className = this.className;

  return div;
}

Container.prototype.remove = function () {
  var node = document.getElementById(this.id);
  node.parentElement.removeChild(node);
}

function Menu(id, className, items) {
  Container.call(this, id, className);

  this.items = items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.render = function () {
  var ul = document.createElement('ul');

  ul.id = this.id;
  ul.className = this.className;
  this.items.forEach(function (item) {
    if (item instanceof Container) {
      ul.appendChild(item.render());
    }
  });

  return ul;
}

function MenuItem(id, className, href, label) {
  Container.call(this, id, className);
  this.href = href;
  this.label = label;
}

MenuItem.prototype = Object.create(Container.prototype);

MenuItem.prototype.render = function () {
  var a = document.createElement('a');
  a.id = this.id;
  a.className = this.className;
  a.href = this.href;
  a.textContent = this.label;
  var li = document.createElement('li');
  li.appendChild(a);
  return li;
}

function SuperMenu(id, className, items, href, label) {
  Menu.call(this, id, className, items);
  this.label = label;
  this.href = href;
}

SuperMenu.prototype = Object.create(Menu.prototype);
SuperMenu.prototype.render = function () {
  if (this.href && this.label) {
    var itemMenu = new MenuItem(this.href, this.label).render();
    itemMenu.appendChild(Menu.prototype.render.call(this));
    return itemMenu;
  } else {
    return Menu.prototype.render.call(this);
  }

}
