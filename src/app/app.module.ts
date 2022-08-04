import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClientesComponent } from './components/clientes/clientes.component';
import { RegistroClientesComponent } from './components/clientes/registro-clientes/registro-clientes.component';
import { ListaClientesComponent } from './components/clientes/lista-clientes/lista-clientes.component';
import { FooterComponent } from './components/footer/footer.component';
import { ClientesService } from './services/clientes.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    RegistroClientesComponent,
    ListaClientesComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule
  ],
  providers: [
    ClientesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
