// 2. Создать наследника класса Menu – новый класс должен уметь строить меню со вложенными пунктами,
//  т.е с подменю. Подсказка: главный секрет – в обходе объекта пунктов меню и проверке типов.

function Container(someId, someClass) {
  this.id = someId;
  this.class = someClass;
}

Container.prototype.render = function () {
  var div = document.createElement('div');
  div.id = this.id;
  div.className = this.class;

  return div
};

Container.prototype.remove = function () {
  document.getElementById(this.id).remove();
}

function Menu(someId, someClass, items) {
  Container.call(this, someId, someClass);
  this.items = items;
}

Menu.prototype = Object.create(Container.prototype);

Menu.prototype.render = function () {
  var ul = document.createElement('ul');
  ul.id = this.id;
  ul.className = this.class;

  this.items.map(function (item) {
    if (item instanceof Container) {
      ul.appendChild(item.render());
    }
  })

  return ul
};


function MenuItem(href, label) {
  Container.call(this, 'idMenuItem', 'classIdMenuItem');
  this.href = href;
  this.label = label;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.render = function () {
  var a = document.createElement('a');
  var li = document.createElement('li');

  a.href = this.href;
  a.textContent = this.label;
  li.id = this.id;
  li.className = this.class;

  li.appendChild(a);

  return li
}

function SuperMenu(someId, someClass, items, href, label) {
  Menu.call(this, someId, someClass, items);
  this.href = href;
  this.label = label;
}

SuperMenu.prototype = Object.create(Menu.prototype);
SuperMenu.prototype.render = function () {
  if (this.href && this.label) {
    var link = new MenuItem(this.href, this.label).render();
    link.appendChild(Menu.prototype.render.call(this));
    return link
  } else {
    return Menu.prototype.render.call(this);
  }
}