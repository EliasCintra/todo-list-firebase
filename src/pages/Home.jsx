import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import Topbar from './Topbar';
import Swal from 'sweetalert2';
import { db } from '../auth/firebase';
import { getAuth } from 'firebase/auth';
import { where } from 'firebase/firestore';
import { AiOutlinePlus } from 'react-icons/ai';
import { Box, Checkbox, IconButton, Typography } from '@mui/material';
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';

const style = {
  bg: `p-4`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-blue-500 text-slate-100`,
  count: `text-center p-2`,
};

function Home() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [tarefas, setTarefas] = useState([]);
  const [input, setInput] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [mostrarPendentes, setMostrarPendentes ] = useState(false)

  // Ler dados do Firebase
  useEffect(() => {
    const q = mostrarPendentes
      ? query(collection(db, 'tarefas'), where('userId', '==', user.uid), where('completed', '==', false))
      : query(collection(db, 'tarefas'), where('userId', '==', user.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTarefas(todosArr);
    });

    return () => unsubscribe();
  }, [user, mostrarPendentes]);

  // Atualize a tarefas no firebase
  const toggleComplete = async (todo) => {
    if (editingTodo && editingTodo.id === todo.id) {
      // Se a tarefa em edição estiver sendo completada, mantenha apenas a conclusão
      await updateDoc(doc(db, 'tarefas', todo.id), {
        completed: !todo.completed,
      });
      setEditingTodo(null);
    } else {
      // Caso contrário, prossiga com a lógica original
      await updateDoc(doc(db, 'tarefas', todo.id), {
        completed: !todo.completed,
      });
    }
  };

  // Criar Tarefas
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === '') {
      Swal.fire("Preencha o texto da tarefa","","info")
      return;
    }

    if (editingTodo) {
      // Se uma tarefa estiver sendo editada, atualize-a
      await updateDoc(doc(db, 'tarefas', editingTodo.id), {
        text: input,
      });
      setEditingTodo(null);
    } else {
      // Caso contrário, crie uma nova tarefa
      await addDoc(collection(db, 'tarefas'), {
        text: input,
        completed: false,
        userId: user.uid
      });
    }
    setInput('');
  };

  // Editar tarefa
  const editTodo = (todo) => {
    setInput(todo.text);
    setEditingTodo(todo);
  };

  // Deletar tarefa
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'tarefas', id));
  };

  // Mostrar Pendentes
  const handleMostrarPendentes = () => {
    setMostrarPendentes(!mostrarPendentes);
  };

  return (
    <div className={style.bg}>
      <Topbar/>
      <div className={style.container}>
        <h3 className={style.heading}>Lista de Tarefas</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type='text'
            placeholder='Adicionar tarefa'
          />
          <button className={style.button}>
            <AiOutlinePlus />
          </button>
        </form>
        <Box>
          <IconButton size="small" onClick={handleMostrarPendentes}>
            <Checkbox checked={mostrarPendentes} />
            <Typography
              variant="text"
              color="text"
              fontWeight="bold"
              sx={{ cursor: 'pointer', userSelect: 'none', ml: -1 }}
            >
              Ocultar Concluídas
            </Typography>
          </IconButton>
        </Box>
        <ul>
          {tarefas.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        {tarefas.length < 1 ? null : (
          <p className={style.count}>{`Você possui ${tarefas.length} tarefas.`}</p>
        )}
      </div>
    </div>
  );
}

export default Home;
