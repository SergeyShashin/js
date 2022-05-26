function Container(idContainer, classContainer){
  this.idContainer = idContainer;
  this.classContainer = classContainer;
}

Container.prototype.render = function (){
  var div = document.createElement('div');
  div.id = this.idContainer;
  div.className = this.classContainer;
 return div;
}

function Menu(idContainer, classContainer, items){
  Container.call(this, idContainer, classContainer);
  this.items = items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.render = function(){
  var ul = document.createElement('ul');
  ul.id = this.idContainer;
  ul.className = this.classContainer;

  this.items.forEach(function(item) {
    if(item instanceof Container){
      ul.appendChild(item.render());
    }    
        
  });

  return ul;

}

function MenuItem(href, label){
  Container.call(this, 'idItem', 'classItem')
  this.href = href;
  this.label = label;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.render = function(){
  var li = document.createElement('li');
  var a = document.createElement('a');
  a.href = this.href;
  a.textContent = this.label;
  li.id = this.idContainer;
  li.className = this.classContainer;
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
    var itemMenu = new MenuItem(this.href, this.label).render();
    itemMenu.appendChild(Menu.prototype.render.call(this));
    return itemMenu;

  }else{
    return Menu.prototype.render.call(this);
  }

}