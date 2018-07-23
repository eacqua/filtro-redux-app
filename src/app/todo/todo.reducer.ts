import { TodoComponent } from './todo.component';

import * as fromTodo from './todo.actions';

import { Todo } from './model/todo.model';
import { TOGGLE_ALL_TODO } from './todo.actions';
import { TodoFooterComponent } from './todo-footer/todo-footer.component';

const todo1 = new Todo('Vencer a Thanos');
const todo2 = new Todo('Salvar el mundo');
const todo3 = new Todo('pedir prestado el traje de Ironman');

todo2.completado = true;

const estadoInicial: Todo[] = [todo1,todo2,todo3];

export function todoReducer( state = estadoInicial, action: fromTodo.Acciones ): Todo[] {

    switch (action.type) {

        case fromTodo.AGREGAR_TODO:
            const todo = new Todo(action.texto);
            return [ ...state, todo ] ;
                // esto es : estoy clonando el estado actual para no mutarlo.
                // Es un nuevo objeto. Es para no pasarlo por referencia, como lo haris javascript: 
                // 'return state.push( todo );'  .
        case fromTodo.TOGGLE_TODO:
            return state.map( todoEdit => {
                if( todoEdit.id === action.id) {
                    return {
                        ...todoEdit,
                        completado: !todoEdit.completado
                    };
                } else{
                    return todoEdit;
                }
            });
        // Buscar en mozilla.map (Array.prototype.map()) las propiedades o metodos que tienen los arreglos y funciones de javascript.
        // Sirve para asegurarse que rompemos la referencia de javascript con los objetos (para no mutar el estado)

        case fromTodo.EDITAR_TODO:
            return state.map( todoEdit => {
                if( todoEdit.id === action.id) {
                    return {
                        ...todoEdit,
                        texto: action.texto
                    };
                } else{
                    return todoEdit;
                }
            });

        case fromTodo.BORRAR_TODO:
            return state.filter( todoEdit => todoEdit.id !== action.id );

        case fromTodo.BORRAR_ALL_TODO:
            return state.filter( todoEdit => !todoEdit.completado);

        case fromTodo.TOGGLE_ALL_TODO:
            return state.map( todoEdit => {
                    return {
                        ...todoEdit,
                        completado: action.completado
                    };
            });

        default:
            return state;

    }


}





