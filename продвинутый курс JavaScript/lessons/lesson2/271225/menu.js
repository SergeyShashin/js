'use strict';

// 2. Создать наследника класса Menu – новый класс должен уметь строить меню со вложенными пунктами,
//  т.е с подменю. Подсказка: главный секрет – в обходе объекта пунктов меню и проверке типов.

function Container(idText, classText) {
  this.idText = idText;
  this.classText = classText;
}

Container.prototype.render = function () {
  var containerHTMLEl = document.createElement('div');
  containerHTMLEl.id = this.idText;
  containerHTMLEl.className = this.classText;

  return containerHTMLEl;
};

Container.prototype.remove = function () {
  document.getElementById(this.idText).remove();
};

function Menu(idText, classText, items) {
  Container.call(this, idText, classText);
  this.items = items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.render = function () {
  var menuHTMLEl = document.createElement('ul');
  menuHTMLEl.id = this.idText;
  menuHTMLEl.className = this.classText;

  this.items.forEach(el => {
    if (el instanceof Container) {
      menuHTMLEl.appendChild(el.render());
    }
  });

  return menuHTMLEl;
};

function MenuItem(href, label) {
  Container.call(this, '', '');
  this.href = href;
  this.label = label;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.render = function () {
  var itemHTMLEl = document.createElement('li');
  var linkHTMLEl = document.createElement('a');

  itemHTMLEl.id = this.idText;
  itemHTMLEl.className = this.classText;
  linkHTMLEl.href = this.href;
  linkHTMLEl.textContent = this.label;

  itemHTMLEl.appendChild(linkHTMLEl);

  return itemHTMLEl;
};

function SuperMenu(idText, classText, items, href, label) {
  Menu.call(this, idText, classText, items);
  this.href = href;
  this.label = label;
}

SuperMenu.prototype = Object.create(Menu.prototype);
SuperMenu.prototype.render = function () {
  if (this.href && this.label) {
    let subMenuHTMLEl = new MenuItem(this.href, this.label).render();
    subMenuHTMLEl.appendChild(new Menu(this.idText, this.idClass, this.items).render());
    return subMenuHTMLEl;
  } else {
    return new Menu(this.idText, this.idClass, this.items).render();
  }
}