var gallery = [
  {id:1, pathTosmall: './img/small/1.png', pathToFull: './img/full/1.png'},
  {id:2, pathTosmall: './img/small/2.png', pathToFull: './img/full/2.png'},
  {id:2, pathTosmall: './img/small/3.png', pathToFull: './img/full/3.png'},
  {id:2, pathTosmall: './img/small/4.png', pathToFull: './img/full/4.png'},
  {id:2, pathTosmall: './img/small/5.png', pathToFull: './img/full/5.png'},
 
];

var ul = document.createElement('ul');

gallery.forEach(function(item){
    
  var li = document.createElement('li');
  var img = document.createElement('img');
  var a = document.createElement('a');
  img.src=item.pathTosmall;
  a.href = item.pathToFull;
  a.appendChild(img);
  li.appendChild(a);
  ul.appendChild(li);
})

document.body.appendChild(ul);