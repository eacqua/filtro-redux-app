import { Todo } from '../model/todo.model';
import { AppState } from '../../app.reducers';
import { Component, OnInit } from '@angular/core';

import * as fromTodo from '../todo.actions';

import * as fromFiltro from '../../filter/filter.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  pendientes: number;

  filtrosValidos: fromFiltro.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  // estos son los textos que aparecen en las opciones del footer
  filtroActual: fromFiltro.filtrosValidos;

  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe( state => {

      this.contarPendientes( state.todos);
      this.filtroActual = state.filtro;

    });
  }

  cambiarFiltro( nuevoFiltro: fromFiltro.filtrosValidos ) {

    const accion = new fromFiltro.SetFiltroAction(nuevoFiltro);
    this.store.dispatch( accion );
  }

  contarPendientes( todos: Todo[] ){
    this.pendientes = todos.filter( todo => !todo.completado ).length;

  }

  borrarTodo() {
    const accion = new fromTodo.BorrarAllTodoAction();
    this.store.dispatch( accion );
  }
}
