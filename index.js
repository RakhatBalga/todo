document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('task-input');
    const button = document.querySelector('.add');
    const list = document.querySelector('.list');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function render() {
        list.innerHTML = '';

        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.textContent = todo;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';

            deleteBtn.addEventListener('click', () => {
                todos.splice(index, 1);
                render();
            });

            li.appendChild(deleteBtn);
            list.appendChild(li);
        });

        // save to localStorage
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    button.addEventListener('click', () => {
        const value = input.value.trim();
        if (value === '') return;

        todos.push(value);
        render();
        input.value = '';
    });

    input.addEventListener('keydown', (e) => {
        if(e.key === 'Enter') {
            button.click();
        }
    });

    // initial render
    render();
});