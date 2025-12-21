'use strict';

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
  Container.call(this, 'idItem', 'classItem');
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