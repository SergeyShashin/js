/*
  2. Создать наследника класса Menu – новый класс должен уметь строить меню со вложенными пунктами,
  т.е с подменю. Подсказка: главный секрет – в обходе объекта пунктов меню и проверке типов.
*/

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