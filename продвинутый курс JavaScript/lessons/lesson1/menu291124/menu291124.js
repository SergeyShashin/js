
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
      ul.appendChild(item);
    }

  });

  return ul
};

function MenuItems(href, label) {
  Container.call(this, 'idLiEl', 'classLiEl');
  this.href = href;
  this.label = label;
}

MenuItems.prototype = Object.create();

