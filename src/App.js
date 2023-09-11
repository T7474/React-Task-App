import "./App.css";
import Header from "./components/Header";
import AddForm from "./components/AddForm";
import Item from "./components/Item";
import { useState, useEffect } from "react";

function App() {
  //สร้าง state
  const [task, setTask] = useState( JSON.parse(localStorage.getItem('task')) || []);
  const [title, setTitle] = useState(""); //ข้อมูลที่กรอก
  const [editId, setEditId] = useState(null); //แก้ไขข้อมูลที่มีอยู่แล้ว
  const [theme,setTheme] = useState("dark"); 
  //Local Storage
  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(task));
  }, [task]);

  //ลบข้อมูล
  function deleteTask(id) {
    const result = task.filter((item) => item.id !== id);
    setTask(result);
  }

  //แก้ไขข้อมูล
  function editTask(id) {
    setEditId(id);
    const editTask = task.find((item) => item.id === id);
    setTitle(editTask.title);
  }

  //ป้อนข้อมูลใน input
  function saveTask(e) {
    e.preventDefault();
    if (!title) {
      alert("กรุณาป้อนข้อมูล");
    } else if (editId) {
      //อัพเดทข้อมูล
      const updateTask = task.map((item) => {
        //รายการใดมี ID ตรงกับ ID ที่แก้ไข
        if (item.id === editId) {
          return { ...item, title: title };
        }
        return item;
      });
      setTask(updateTask);
      setEditId(null);
      setTitle("");
    } else {
      // เพิ่มรายการใหม่
      const newTask = {
        id: Math.floor(Math.random() * 1000),
        title: title,
      };
      setTask([...task, newTask]);
      setTitle("");
    }
  }
  return (
    <div className={'App ' + theme}>
      <Header theme={theme} setTheme={setTheme}/>
      <div className="container">
        <AddForm
          title={title}
          setTitle={setTitle}
          saveTask={saveTask}
          editId={editId}
        />
        <section>
          {task.map((data) => (
            <Item
              key={data.id}
              data={data}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

export default App;
