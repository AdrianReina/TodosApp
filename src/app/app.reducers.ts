import { applySourceSpanToStatementIfNeeded } from '@angular/compiler/src/output/output_ast';
import { ActionReducerMap } from '@ngrx/store';
import { Todo } from './todo/models/todo.model';
import { todoReducer } from './todo/todo.reducer';
import { filtroReducer } from './filter/filter.reducer';
import { filtrosValidos } from './filter/filter.actions';

export interface AppState {
  todos: Todo[];
  filtro: filtrosValidos;
}

export const reducers: ActionReducerMap<AppState, any> = {
  todos: todoReducer,
  filtro: filtroReducer,
};
