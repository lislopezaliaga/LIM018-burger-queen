import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ViewAdminComponent } from './components/view-admin/view-admin.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth, Auth } from '@angular/fire/auth';
import { provideFirestore,getFirestore, Firestore } from '@angular/fire/firestore';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MeseroComponent } from './components/mesero/mesero.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ChefComponent } from './components/chef/chef.component';
import { OrderReadyComponent } from './components/mesero/order-ready/order-ready.component';
import { TotalOrdersComponent } from './components/view-admin/total-orders/total-orders.component';
import { PedidoService } from './servicios/pedido.service';
import { UserService } from './servicios/user.service';
import { TomarPedidoComponent } from './components/mesero/tomar-pedido/tomar-pedido.component';
// import { PedidoService } from './servicios/pedido.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ViewAdminComponent,
    RegisterUserComponent,
    MeseroComponent,
    TomarPedidoComponent,
    ChefComponent,
    OrderReadyComponent,
    TotalOrdersComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSelectModule,
    FormsModule
  ],
  // providers: [{provide: UserService, useValue: Auth},{provide: Firestore, useValue: UserService}],
  //  providers: [PedidoService,UserService,{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
    // ,{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent]
})
export class AppModule { }
