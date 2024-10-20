// Получение элементов
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Предотвращаем перезагрузку страницы при отправке формы
taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addTask();
});

function addTask () {
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    // Создаем элементы для новой задачи
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-task';
    deleteBtn.textContent = '✖';

    // Добавляем обработчик события для кнопки удаления
    deleteBtn.addEventListener('click', () => {
      taskList.removeChild(li);
    });

    // Собираем элементы
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    // Очищаем поле ввода
    taskInput.value = '';
  }
}
