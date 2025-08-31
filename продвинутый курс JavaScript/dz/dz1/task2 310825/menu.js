// 2. Создать наследника класса Menu – новый класс должен уметь строить меню со вложенными пунктами,
//  т.е с подменю. Подсказка: главный секрет – в обходе объекта пунктов меню и проверке типов.

function Container(userId, userClass) {
  this.userId = userId;
  this.userClass = userClass;
}

Container.prototype.render = function () {
  var divEl = document.createElement('div');

  divEl.id = this.userId;
  divEl.className = this.userClass;

  return div
};

Container.prototype.remove = function () {
  document.getElementById(this.userId).remove();
};

function Menu(userId, userClass, items) {
  Container.call(this, userId, userClass)
  this.items = items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.render = function () {
  var ulEl = document.createElement('ul');
  ulEl.id = this.userId;
  ulEl.className = this.userClass

  this.items.forEach(function (item) {
    if (item instanceof Container) {
      ulEl.appendChild(item.render());
    }
  });

  return ulEl;
};


function MenuItem(href, label) {
  Container.call(this, '', '')
  this.href = href;
  this.label = label;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.render = function () {
  var liEl = document.createElement('li');
  var aEl = document.createElement('a');
  liEl.id = this.userId;
  liEl.className = this.userClass;
  aEl.href = this.href;
  aEl.textContent = this.label;
  liEl.appendChild(aEl);

  return liEl;
}

