import { Component, OnInit } from '@angular/core';
import * as fromfiltro from '../../filter/filter.actions';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { Todo } from '../models/todo.model';
import * as fromTodo from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: [],
})
export class TodoFooterComponent implements OnInit {
  pendientes!: number;
  filtrosValidos: fromfiltro.filtrosValidos[] = [
    'todos',
    'completados',
    'pendientes',
  ];

  filtroActual!: fromfiltro.filtrosValidos;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.contarPendientes(state.todos);
      this.filtroActual = state.filtro;
    });
  }

  cambiarFiltro(nuevoFiltro: fromfiltro.filtrosValidos) {
    const accion = new fromfiltro.SetFiltroAction(nuevoFiltro);
    this.store.dispatch(accion);
  }

  contarPendientes(todos: Todo[]) {
    this.pendientes = todos.filter((todo) => !todo.completado).length;
  }
  borrarTodo() {
    const accion = new fromTodo.BorrarAllTodoAction();

    this.store.dispatch(accion);
  }
}
