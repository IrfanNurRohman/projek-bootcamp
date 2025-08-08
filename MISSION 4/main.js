 let tasks = [];


    function addTask() {
      const text = document.getElementById('task').value.trim();
      const date = document.getElementById('date').value;
      const priority = document.getElementById('priority').value;

      if (!text || !date) {
        alert('Tulis tugas dan pilih tanggal.');
        return;
      }

      tasks.push({ text, date, priority, done: false });
      document.getElementById('task').value = '';
      document.getElementById('date').value = '';
      renderTasks();
    }

    function toggleDone(index) {
      tasks[index].done = !tasks[index].done;
      renderTasks();
    }

    function deleteTask(index) {
      tasks.splice(index, 1);
      renderTasks();
    }

    function clearAll() {
      if (confirm('Hapus semua task?')) {
        tasks = [];
        renderTasks();
      }
    }

    function renderTasks() {
      const todoList = document.getElementById('todoList');
      const doneList = document.getElementById('doneList');
      todoList.innerHTML = '';
      doneList.innerHTML = '';

      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.done ? 'done' : '';

        const span = document.createElement('span');
        span.innerHTML = `${task.text} <br><small>${task.date}</small>`;

        const priorityClass = `priority-${task.priority}`;
        const prioritySpan = document.createElement('span');
        prioritySpan.className = priorityClass;
        prioritySpan.textContent = task.priority.toUpperCase();

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkbox.onchange = () => toggleDone(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => deleteTask(index);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(prioritySpan);
        li.appendChild(deleteBtn);

        if (task.done) {
          doneList.appendChild(li);
        } else {
          todoList.appendChild(li);
        }
      });
    }
  function display(){
        let today = new Date();
        const months = ["Januari","Februari","Maret","April","Mei",
        "Juni","Juli","Agustus","September","Oktober","November","Desember"];
        
         let month = months[today.getMonth()];
         let hour = today.getHours();
         let min = today.getMinutes();
         let sec = today.getSeconds();
         let day = today.getDate();

         day = day < 10 ? day = "0" + day : day;
         min = min < 10 ? min = "0" + min : min;
         sec = sec < 10 ? sec = "0" + sec: sec;

         if (hour > 12){
            hour -= 12;
            noon = "PM"
         } else {
            noon = "AM"
         };

         hour = hour < 10 ? hour = "0" + hour : hour;
         document.querySelector("#clock").innerHTML = 
         day + " "
         + month + " "
         + today.getFullYear() + "<br>"
         + hour + ":"
         + min + ":"
         + sec + " " + noon;
       
    }
    setInterval(display, 100);