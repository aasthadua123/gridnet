import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const authRoutes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
