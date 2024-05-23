// 2. Создать наследника класса Menu – новый класс должен уметь строить меню со вложенными пунктами,
//  т.е с подменю. Подсказка: главный секрет – в обходе объекта пунктов меню и проверке типов.

function Container(someId, someClass) {
  this.someId = someId;
  this.someClass = someClass;
}

Container.prototype.render = function () {
  var div = document.createElement('div');
  div.id = this.someId;
  div.className = this.someClass;
  return div
};

Container.prototype.remove = function () {
  document.getElementById(this.someId).remove();
};

function Menu(someId, someClass, items) {
  Container.call(this, someId, someClass);
  this.items = items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.render = function () {
  var ul = document.createElement('ul');
  ul.id = this.someId;
  ul.className = this.someClass;

  this.items.forEach(item => {
    if (item instanceof Container) {
      ul.appendChild(item.render());
    }
  });
  return ul;
};

function MenuItem(someLabel, someHref) {
  Container.call(this, '', 'item');
  this.someLabel = someLabel;
  this.someHref = someHref;
}

MenuItem.prototype = Object.create(Container.prototype);

MenuItem.prototype.render = function () {
  var li = document.createElement('li');
  var a = document.createElement('a');
  li.id = this.someId;
  li.className = this.someClass;
  a.textContent = this.someLabel;
  a.href = this.someHref;
  li.appendChild(a);

  return li
};

function SuperMenu(someId, someClass, items, label, href) {
  Menu.call(this, someId, someClass, items);
  this.label = label;
  this.href = href;
}

SuperMenu.prototype = Object.create(Menu.prototype);
SuperMenu.prototype.render = function () {
  if (this.label && this.href) {
    var subMenu = new MenuItem(this.label, this.href).render();
    subMenu.appendChild(Menu.prototype.render.call(this));
    return subMenu;
  } else {
    return Menu.prototype.render.call(this);
  }
}