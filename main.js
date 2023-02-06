window.addEventListener('load',()=>{ //Excute By Loading
    //The window is at a root/top level at the JavaScript object hierarchy
    todos= localStorage.getItem('todos') || []  ;
    //if todos is already present as key then it will not be an empty array on reload

    // converting Todos String in JavaSCRIPT Language By Using jSON.PARSE()
    const nameInput = document.querySelector('#name');
    //The querySelector() method returns the first element that matches a CSS selector.
     // To return all matches (not only the first), use the querySelectorAll() instead.
    const newTodoform = document.querySelector('#new-todo-form');
     const username =localStorage.getItem('username') || '';
     //localStorage.getItem('username') it will store value of key username if present any key of username else give Empty String
     
     nameInput.value=username;
     //First Here Value is Empty String it will not Count this Value as Change once After Changing It Value Changed on window on load we can excute Below Listner
     
     nameInput.addEventListener('change',e => {
          //Using Change Keyword if nameInput changes then Event Listner will be Excuted 
           //by loading.
         localStorage.setItem('username',e.target.value); 
      })

      newTodoform.addEventListener('submit',e =>{
        //The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
        e.preventDefault();
        //this is used to not submit Form We need  Some Vadidation to do and not reload page by submittinng //basically used on submit and links

        const todo ={ //Creating dictionary or object 
            content: e.target.elements.content.value,
            category : e.target.elements.category.value,
            done:false,
            createdAt : new Date().getTime() //give time in millisecond
        }
        console.log(e.target.elements.category.value)

        todos.push(todo) ; //it is an array which will contain 

        localStorage.setItem('todos',JSON.stringify(todos));
        // converting Todos to String
        e.target.reset();
        //reset is used to reset value on clicking submit button
        DisplayTodos();
      })
        DisplayTodos();
      })

    function DisplayTodos () {

      //make use of #todo-list
        const todoList =document.querySelector('#todo-list');
        todoList.innerHTML='';
        todos.forEach(todo => {

          //created list-> listItem tag as div
            const todoItem =document.createElement('div');
            todoItem.classList.add('todo-item');

          //created all tag required
            const label =document.createElement('label');
            const input =document.createElement('input');
            const span =document.createElement('span');
            const content =document.createElement('div');
            const actions =document.createElement('div');
            const edit = document.createElement('button');
            const deleteButton =document.createElement('button');

          //creating checkbox
            input.type ='checkbox';
            input.checked= todo.done;//unmark = false
            span.classList.add('bubble');
            
          //check if todo category is Personal or not if personal then class added to span to light color blue or pink. ...(check value="")
            if (todo.category == 'Personal'){
              span.classList.add('personal');
            } else{
              span.classList.add('business');
            }

            //Adding class as required
            content.classList.add('todo-content');
            actions.classList.add('actions');
            edit.classList.add('edit');
            deleteButton.classList.add('delete');

            //adding Input to todo-content block to insert value from content   from todo object
            content.innerHTML=`<input type="text" value="${todo.content}" readonly>`

            //giving value to Button 
            edit.innerHTML='Edit';
            deleteButton.innerHTML='Delete';

            //define Structure todo-list => todo-item(label=> input(checkbox) ,span,content => input(text),actions => button =>EDIT,DELETE )
            label.appendChild(input);
            label.appendChild(span);
            actions.appendChild(edit);
            actions.appendChild(deleteButton);
            todoItem.appendChild(label);
            todoItem.appendChild(content);
            todoItem.appendChild(actions);
            todoList.appendChild(todoItem);

            if (todo.done){ //if todo.done is true then 
              todoItem.classList.add('done');
            }

            //on click on input of 
            input.addEventListener('click', e =>{
              todo.done = e.target.checked;
              localStorage.setItem('todos',JSON.stringify(todos));
              //update whole string with done:true

              if(todo.done){//as done gets true we will make mark as done means cancels or line through 
                todoItem.classList.add('done');
              }
              else{
                todoItem.classList.remove('done');
              }
              DisplayTodos();
            })
            //edit clicked we edit input by  removing attribute of readonly
            edit.addEventListener('click',e=> {
              const input = content.querySelector('input');
              input.removeAttribute('readonly');
              input.focus(); //after removing focus will be on input bar
              input.addEventListener('blur',e=>
              {
                input.setAttribute('readonly',true);
                todo.content = e.target.value;
                //edited value will be given and then set again to readonly     attribute
                localStorage.setItem('todos',JSON.stringify('todos'));
                DisplayTodos();
              })
            })

            deleteButton.addEventListener('click',e=>
            { 
              todos =todos.filter(t => t!= todo)
              console.log(todos); //make Empty Array
              localStorage.setItem('todos',JSON.stringify(todos));
              DisplayTodos();
            })


        
    })
}
const local =document.querySelector('.local');
local.addEventListener('click',()=>{
  localStorage.clear();
})
