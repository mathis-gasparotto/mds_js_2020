let todoItems = []; //les éléments de la liste 
const form = document.querySelector('.js-form'); //recupère les infos du formulaire
const list = document.querySelector('.js-todo-list'); //on associe la constante list aux élément du DOM .js-todo-list (la liste ul)




function toggleDone(key) {
    const index = todoItems.findIndex(item => item.id === Number(key)); //on localise la ligne 
    todoItems[index].checked = !todoItems[index].checked; //on lui inverse sa propriété (si il est en false, alors on le met en true et vice versa)
    renderTodo(todoItems[index]); //on recréer la ligne en la mettant à jour
}

function deleteTodo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key)); //on localise la ligne
    const todo = { //on créer un novel objet todo..
        deleted: true, //.. avec la propriété deleted sur true
        ...todoItems[index] //et les autres propriétés qu'il a déjà
    };
    todoItems = todoItems.filter(item => item.id !== Number(key)); //on supprime l'élément todo
    renderTodo(todo); //on recréer la ligne avec la version à jour
}

function renderTodo(todo) {
    const list = document.querySelector('.js-todo-list'); //on associe la constante list aux élément du DOM .js-todo-list (la liste ul)
    const item = document.querySelector(`[data-key='${todo.id}']`); //on sélectionne la tâche en question et l'associe à la constante item

    if (todo.deleted) { //si il faut supprimer la ligne
        item.remove(); //alors on supprime la ligne/la tâche
        return //et on applique le changement
    }

    const isChecked = todo.checked ? 'done' : ''; //si la constante todo.checked vaut true, mettre done à la constante isCheked sinon lui mettre une chaine de caractères vide
    // Create an `li` element and assign it to `node`

    const node = document.createElement("li"); //on créer une balise li et on le lie à la constante node
    node.setAttribute('class', `todo-item ${isChecked}`); //on lui rajoute la class 'todo-item' et, si il est coché, 'done'
    node.setAttribute('data-key', todo.id); //on lui ajoute comme data-key, la constante todo.id, c'est-à-dire le nombre de miliseconde entre le 01/01/1970 à 00h et quand il a été créé

    //on définie ce qu'il y aura dans la balise li
    node.innerHTML = ` 
      <input id="${todo.id}" type="checkbox"/>
      <label for="${todo.id}" class="tick js-tick"></label>
      <span>${todo.text}</span>
      <button class="delete-todo js-delete-todo">
      <svg><use href="#delete-icon"></use></svg>
      </button>
    `;

    if (item) { //si la tâche est déjà dans la liste
        list.replaceChild(node, item); //alors on la remplace par sa version à jour
    } else {
        list.append(node); //sinon on l'ajoute simplement à la liste
    }
}

function addTodo(text) {
    const todo = { //on créer un objet todo avec comme propriété : ..
        text, //le texte de l'élément ajouté à la liste
        checked: false, //pas encore fait...
        id: Date.now(), //le nombre de millisecondes entre le 01/01/1970 à 00h et quand il a été ajouté, en tant qu'id pour lui faire un id unique
    };

    todoItems.push(todo); //on mets toutes le info de la constante todo dans todoItems
    console.log(todoItems); //on retouren ces infos dans la console
    renderTodo(todo); //on exécute la fonction renderTodo(todo) (qui ajoute une tâche à la liste)
}




form.addEventListener('submit', event => { //quand on clique sur le submit ..
    event.preventDefault(); //enlever l'actualisation de la page
    const input = document.querySelector('.js-todo-input'); //on séléction la liste

    const text = input.value.trim(); //récupère le texte saisi
    if (text !== '') { //si le text n'est pas vide
        addTodo(text); //on génère toutes ses infos
        input.value = ''; //on l'ajoute la tâche à la liste
        input.focus(); //donne le focus clavier à la liste
    }
});

list.addEventListener('click', event => { //lorsqu'il y a une clique dans la liste
    if (event.target.classList.contains('js-tick')) { //si il y a un élément dans la list qui contient la class js-tick
        const itemKey = event.target.parentElement.dataset.key; //on récupère les infos de son parent (balise li) pour les mettre dans la constante itemKey
        toggleDone(itemKey); //on inverse entre cohé et décoché 
    }

    if (event.target.classList.contains('js-delete-todo')) { //si il y a un élément dans la list qui contient la class js-delete-todo
        const itemKey = event.target.parentElement.dataset.key; //on récupère les infos de son parent (balise li) pour les mettre dans la constante itemKey
        deleteTodo(itemKey); //on supprime la ligne
    }
});