validation = {
  name: /^[а-яё\w]+$/i,
  phone: /^\+\d\(\d{3}\)\d{3}\-\d{4}$/,
  email: /^[\w\-\.]+@\w+\.[a-z]{2,3}$/
}

window.onload = function(){
  document.getElementById('send').addEventListener('click', function(event){
    Object.keys(validation).forEach(function(rule){
      var elements = document.querySelectorAll('[name="'+rule+'"]');
      elements.forEach(function(element){
        validation[rule].test(element.value)? element.classList.remove('invalid') : element.classList.add('invalid');        
      });    
      
    })    
    event.preventDefault();
  })
}