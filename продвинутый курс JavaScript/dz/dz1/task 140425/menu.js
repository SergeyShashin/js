// 1. Улучшить базовый класс, добавив в него общий для всех метод remove(), который удаляет контейнер.

function Container(idContainer, classContainer) {
  this.idContainer = idContainer;
  this.classContainer = classContainer;
}

Container.prototype.render = function () {
  let div = document.createElement('div');
  div.id = this.idContainer;
  div.className = this.classContainer;
  return div;
}

Container.prototype.remove = function () {
  document.getElementById(this.idContainer).remove();
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



function MenuItem(label, href) {
  Container.call(this, '', 'menuItemClass');
  this.href = href;
  this.label = label;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.render = function () {
  var li = document.createElement('li');
  li.id = this.idContainer;
  li.className = this.classContainer;
  var aEl = document.createElement('a');
  aEl.href = this.href;
  aEl.textContent = this.label;
  li.appendChild(aEl);
  return li;
}

var menuItem = new MenuItem('sdf', '/sdf');

