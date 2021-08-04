import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Todo } from '../models/todo.model';
import {
  EditarTodoAction,
  ToggleTodoAction,
  BorrarTodoAction,
} from '../todo.actions';

@Component({
  selector: 'app-todos-item',
  templateUrl: './todos-item.component.html',
  styles: [],
})
export class TodosItemComponent implements OnInit {
  @Input() todo!: Todo;
  @ViewChild('txtInputFisico') txtInputFisico!: ElementRef;

  chkField!: FormControl;

  txtInput!: FormControl;
  editando: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.chkField = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);
    this.chkField.valueChanges.subscribe((valor) => {
      const accion = new ToggleTodoAction(this.todo.id);
      this.store.dispatch(accion);
    });
    console.log(this.todo);
  }

  editar() {
    this.editando = true;
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  terminarEdicion() {
    this.editando = false;
    if (this.txtInput.invalid) {
      return;
    }

    if (this.txtInput.value === this.todo.texto) {
      return;
    }
    const accion = new EditarTodoAction(this.todo.id, this.txtInput.value);
    this.store.dispatch(accion);
  }

  borrarTodo() {
    const accion = new BorrarTodoAction(this.todo.id);
    this.store.dispatch(accion);
  }
}
