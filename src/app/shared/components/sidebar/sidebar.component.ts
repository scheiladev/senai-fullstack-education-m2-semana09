import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  admin = false;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.admin = this.loginService.usuarioLogado?.admin ? true : false;
  }
}
