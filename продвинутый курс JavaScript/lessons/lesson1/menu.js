'use strict';

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
