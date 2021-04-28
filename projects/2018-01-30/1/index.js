const hello1 = document.getElementById('hello');
hello1.title = 'Este é um web component';

const hello2 = document.createElement('hello-world');
hello1.title = 'Este é outro web component';
document.body.appendChild(hello2);
