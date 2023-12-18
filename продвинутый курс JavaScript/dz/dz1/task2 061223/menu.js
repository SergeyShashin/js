// Создать наследника класса Menu – новый класс должен уметь строить меню со вложенными
// пунктами, т.е с подменю. Подсказка: главный секрет в обходе объекта пунктов меню и
// проверке типов.

function Container(idSome, classSome) {
  this.idSome = idSome;
  this.classSome = classSome;
}

Container.prototype.render = function () {
  var div = document.createElement('div');
  div.id = this.idSome;
  div.className = this.classSome;

  return div;
};

Container.prototype.remove = function () {
  document.getElementById(this.idSome).remove();
};

function Menu(idSome, classSome, items) {
  Container.call(this, idSome, classSome);
  this.items = items;
}

Menu.prototype = Object.create(Container.prototype);

Menu.prototype.render = function () {
  let ul = document.createElement('ul');

  ul.id = this.idSome;
  ul.className = this.classSome;

  this.items.forEach(function (item) {

    if (item instanceof Container) {
      ul.appendChild(item.render());
    }

  });


  return ul;
};

function MenuItems(href, label) {
  Container.call(this);
  this.href = href;
  this.label = label;
}

MenuItems.prototype = Object.create(Container.prototype);

MenuItems.prototype.render = function () {
  let li = document.createElement('li');
  let a = document.createElement('a');

  li.id = this.idSome;
  li.className = this.classSome;
  a.href = this.href;
  a.textContent = this.label;


  li.appendChild(a);

  return li;

};

function SuperMenu(idSome, classSome, items, href, label) {
  Menu.call(this, idSome, classSome, items);
  this.href = href;
  this.label = label;
}

SuperMenu.prototype.render = Object.create(Menu.prototype);

SuperMenu.prototype.render = function () {
  console.log(this.href&&this.label);
  console.log(this.href);
  if (this.href && this.label) {
    var itemElement = new MenuItems(this.href, this.label).render();
    console.log(itemElement);
    return itemElement.appendChild(Menu.prototype.render.call(this));
  } else {
    return Menu.prototype.render.call(this);
  }
}

