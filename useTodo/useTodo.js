import { useEffect, useReducer } from "react"
import { todoReducer } from "./todoReducer";


const initialState = [
      // {
   //    id: new Date().getTime(),
   //    description: 'Recolectar almas del vacío',
   //    done: false
   // },
   // {
   //    id: new Date().getTime() *3,
   //    description: 'Recolectar almas del abismo',
   //    done: false
   // }
]

const init = () => {
   return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodo = () => {

   const [ todos, dispatch ] = useReducer(todoReducer, initialState, init);

   useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
   }, [todos])

   const todosCount = todos.length;
   const pendingcountTodo = todos.filter(todo => todo.done).length;

   const onNewTodo = (todo) => {
      const action = {
         type: 'ADD_TODO',
         payload: todo
      }
      dispatch(action);
   }

   const onDeleteTodo = (id) => {
      const action = {
         type: 'Delete_TODO',
         payload: id
      }

      dispatch(action);
   }

   const onHandleToggleTodo = (id) => {
      console.log(id);
      const action = {
         type: 'Toggle_TODO',
         payload: id
      }

      dispatch(action);
   }

   return{
      todos,
      todosCount,
      pendingcountTodo,
      onNewTodo,
      onDeleteTodo,
      onHandleToggleTodo,
   }
}
