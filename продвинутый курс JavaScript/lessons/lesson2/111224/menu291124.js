
function Container(myId, myClass) {
  this.myId = myId;
  this.myClass = myClass;
}

Container.prototype.render = function () {
  var div = document.createElement('div');

  div.id = this.myId;
  div.className = this.myClass;

  return div;
};

Container.prototype.remove = function () {
  document.getElementById(this.myId).remove();
};

function Menu(myId, myClass, items) {
  Container.call(this, myId, myClass);

  this.items = items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.render = function () {
  let ul = document.createElement('ul');

  ul.id = this.myId;
  ul.className = this.myClass;

  this.items.forEach(function (item) {

    if (item instanceof Container) {
      ul.appendChild(item.render());
    }

  });

  return ul
};

function MenuItems(href, label) {
  Container.call(this, 'idLiEl', 'classLiEl');
  this.href = href;
  this.label = label;
}

MenuItems.prototype = Object.create(Container.prototype);
MenuItems.prototype.render = function () {
  var li = document.createElement('li');
  var a = document.createElement('a');
  a.href = this.href;
  a.textContent = this.label;
  li.appendChild(a);

  return li
};

function SuperMenu(myId, myClass, items, href, label) {
  Menu.call(this, myId, myClass, items);
  this.href = href;
  this.label = label;
}

SuperMenu.prototype = Object.create(Menu.prototype);

SuperMenu.prototype.render = function () {
  if (this.href && this.label) {
    var liEl = MenuItems.prototype.render.call(this);
    liEl.appendChild(Menu.prototype.render.call(this));
    return liEl

  } else {
    return Menu.prototype.render.call(this);
  }

}
