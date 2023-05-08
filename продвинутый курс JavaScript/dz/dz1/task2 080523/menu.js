// 2. Создать наследника класса Menu – новый класс должен уметь строить меню со вложенными пунктами,
//  т.е с подменю. Подсказка: главный секрет – в обходе объекта пунктов меню и проверке типов.

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

function SuperMenu(idParam, classNameParam, items, href, label) {
  Menu.call(this, idParam, classNameParam, items);
  this.href = href;
  this.label = label;
}

SuperMenu.prototype = Object.create(Menu.prototype);
SuperMenu.prototype.render = function () {
  if (this.href && this.label) {
    menuWithSubmenu = ItemsMenu.prototype.render.call(this);
    return menuWithSubmenu.appendChild(Menu.prototype.render.call(this));
  } else {
    return Menu.prototype.render.call(this);
  }
}