
function Container(idContainer, classContainer) {
  this.id = idContainer;
  this.classContainer = classContainer;
}

Container.prototype.render = function () {
  let div = document.createElement('div');
  div.id = this.idContainer;
  div.className = this.classContainer;
}

function Menu(idMenu, classMenu, items) {
  Container.call(this, idMenu, classMenu);
  this.items = items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.render = function () {
  let ul = document.createElement('ul');
  ul.id = this.idMenu;
  ul.className = this.classMenu;

  items.forEach(function (item) {
    if (item.instanceOf(Container)) {
      ul.appendChild(item);
    }
  });
}

function MenuItems(href, label) {
  Container.call(this, '', 'menuItem');
  this.href = href;
  this.label = label;
}

MenuItems.prototype = Object.create(Container.prototype);
MenuItems.render = function () {
  
}


