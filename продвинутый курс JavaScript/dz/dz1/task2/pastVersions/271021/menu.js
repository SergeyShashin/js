/**
 * Создает html element с заданными идентификатором, классом
 * @param {string} idContainer идентификатор 
 * @param {string} classContainer класс  
 */
function Container(idContainer, classContainer) {
  this.idContainer = idContainer;
  this.classContainer = classContainer;
}

Container.prototype.render = function () {
  var div = document.createElement('div');
  div.id = this.idContainer;
  div.className = this.className;

 return div;
}

function Menu(idContainer, classContainer, items) {
  Container.call(this, idContainer, classContainer);
  this.items = items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.render = function () {
  var ul = document.createElement('ul');
  ul.id = this.idContainer;
  ul.className = this.classContainer;
  
  this.items.forEach(item => {
    if(item instanceof Container){
      ul.appendChild(item.render());
    }  
    
  });

  return ul;
  
}

function MenuItem(href, label){
  Container.call(this, 'item', 'item');
  this.href = href;
  this.label = label;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.render = function(){
  var li = document.createElement('li');
  var a = document.createElement('a');
  
  li.id = this.idContainer;
  li.className = this.classContainer;

  a.href = this.href;
  a.textContent = this.label;

  li.appendChild(a);

  return li;
}

function SuperMenu(idContainer, classContainer, items, href, label){
  Menu.call(this, idContainer, classContainer, items);
  this.href = href;
  this.label = label;
}

SuperMenu.prototype = Object.create(Menu.prototype);
SuperMenu.prototype.render = function(){
  if(this.href&&this.label){
    var item = new MenuItem(this.href, this.label).render();
    item.id = this.idContainer;
    item.className = this.classContainer;

    item.appendChild(Menu.prototype.render.call(this));

    return item;  

  }else{
    return Menu.prototype.render.call(this);
  }
}
