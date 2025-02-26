export const todoReducer = (initialState= [], action) => {

   const getAction = (type) => {
      const actions = {
         "ADD_TODO" : [...initialState, action.payload],
         "Delete_TODO": () => {
            return initialState.filter(todo => todo.id !== action.payload )
         },
         "Toggle_TODO": () => {
            return initialState.map(todo =>{
               if(todo.id === action.payload){
                  return {
                     ...todo,
                     done: !todo.done
                  }
               }
               return todo;
            });
         },
      }

      const resultAction = typeof actions[type] === "function"
         ? actions[type]() || initialState
         : actions[type] || initialState;

      return resultAction
   }

   const handleAction = getAction(action.type);

   if(handleAction){
      return handleAction;
   }

   return handleAction;

}