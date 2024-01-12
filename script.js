const list = document.getElementById("list");
const createBtn = document.getElementById("create-btn");

let todos = [];
createBtn.addEventListener('click', createNewTodo);

function createNewTodo () {
    // 새로운 아이템 객체 생성 
    const item = {
        id: new Date().getTime(),
        text: "",
        complete: false
    }

    // 배열 처음에 새로운 아이템을 추가
    todos.unshift(item);

    // 요소 생성하기
    const {itemEl, inputEl, editBtnEl, removeBtnEl} = createTodoElement(item);


    // 리스트 요소 안에 방금 생성한 아이템 요소 추가
    list.prepend(itemEl); // prepend: itemEl을 뒤가 아니라 앞에 추가
    
    //disabled 속성 제거
    inputEl.removeAttribute('disabled');
    //input 요소에 focus 
    inputEl.focus();
    saveToLocalStorage();
}

function createTodoElement(item){
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');

    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    // 데이터 반영
    checkboxEl.checked = item.complete;

    if(item.complete){
        itemEl.classList.add('complete');
    }

    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.value = item.text;
    inputEl.setAttribute('disabled', '');

    const actionsEl = document.createElement('div');
    actionsEl.classList.add('actions');
    
    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('material-icons');
    editBtnEl.innerHTML = 'edit';

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('material-icons', 'remove-btn');
    removeBtnEl.innerHTML ='remove_circles';

    // 체크박스
    checkboxEl.addEventListener('change', () => {
        item.complete = checkboxEl.checked;
        
        if(item.complete){
            itemEl.classList.add('complete');
        }else{
            itemEl.classList.remove('complete');
        }
        saveToLocalStorage();
    
    })

    inputEl.addEventListener('blur', () => {
        inputEl.setAttribute('disabled', '');
        saveToLocalStorage();
    })

    editBtnEl.addEventListener('click', () => {
        inputEl.removeAttribute('disabled');
        inputEl.focus();
    })

    removeBtnEl.addEventListener('click', () => {
        // 같은 것은 필터링 되고 다른 것만 새로운 배열로
        todos = todos.filter(t => t.id !== item.id);
        // 요소 없애기 
        itemEl.remove();
        saveToLocalStorage();

    })

    // item의 텍스트 
    inputEl.addEventListener('input', () => {
        item.text = inputEl.value;
    })

    actionsEl.append(editBtnEl);
    actionsEl.append(removeBtnEl);

    itemEl.append(checkboxEl);
    itemEl.append(inputEl);
    itemEl.append(actionsEl);

    return {itemEl, inputEl, editBtnEl, removeBtnEl};


}

// Local Storage에 저장
function saveToLocalStorage(){
    const data = JSON.stringify(todos);
    // 윈도우 객체 생략 가능
    // window.localStorage.setItem('my_todos', data);
    localStorage.setItem('my_todos', data);
}

// Local Storage에서 저장된 데이터 가져오기
function loadFromLocalStorage(){
    const data = localStorage.getItem('my_todos');
    if(data){
        // String인 object 객체로 변환 
        todos = JSON.parse(data); 
    }
}

function displayTodos(){
    loadFromLocalStorage();

    for(let i = 0; i < todos.length; i++){
        const item = todos[i]; 
        const {itemEl} = createTodoElement(item);

        list.append(itemEl);

    }
}

displayTodos(); // 스크립트가 시작되자마자 실행


