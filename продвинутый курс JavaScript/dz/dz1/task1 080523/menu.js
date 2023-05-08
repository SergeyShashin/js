// 1. Улучшить базовый класс, добавив в него общий для всех метод remove(), который удаляет контейнер.

function Container(idParam, classNameParam) {
  this.idParam = idParam;
  this.classNameParam = classNameParam;
}

Container.prototype.render = function () {
  var div = document.createElement('div');
  div.id = this.idParam;
  div.className = this.classNameParam;
  return div;
}

Container.prototype.remove = function () {
  document.getElementById(this.idParam).remove();
}

function Menu(idParam, classNameParam, items) {
  Container.call(this, idParam, classNameParam);
  this.items = items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.render = function () {
  var ul = document.createElement('ul');
  ul.id = this.idParam;
  ul.className = this.classNameParam;
  this.items.forEach(function (item) {
    if (item instanceof Container) {
      ul.appendChild(item.render());
    }
  });

  return ul;
}

function ItemsMenu(href, label) {
  Container.call(this, '', 'items');
  this.href = href;
  this.label = label;
}

ItemsMenu.prototype = Object.create(Container.prototype);
ItemsMenu.prototype.render = function () {
  var li = document.createElement('li');
  var a = document.createElement('a');
  a.href = this.href;
  a.textContent = this.label
  li.appendChild(a);
  return li;
}