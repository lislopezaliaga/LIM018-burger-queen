# 🍔Burger Queen

## Índice

* [1. Introducción](#1-introducción)
* [1. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Desarrollo del proyecto](#3-desarrollo-del-proyecto)
* [4. Resultado final](#4-resultado-final)
* [5. Tecnologías utilizadas](#5-tecnologías-utilizadas)
* [6. Creadoras](#6-creadoras)

***

## 1. Resumen
Este proyecto es una interfaz web para un restaurante de hamburguesas el cual consiste en tomar pedidos usando una _tablet_, y enviarlos a la cocina para que se preparen ordenada y eficientemente el proyecto fue desarrollado con el framework _Angular_ que permitio mantener la interfaz y el estado sincronizados.

###  Requerimientos del cliente

Esta es la información que tenemos del cliente:

> Somos **Burguer Queen**, una cadena de comida 24hrs.
> Nuestra propuesta de servicio 24hrs ha tenido muy buena acogida y, para
> seguir creciendo, necesitamos un sistema que nos ayude a tomar los pedidos de
> nuestros clientes.
>
> Tenemos 2 menús: uno muy sencillo para el desayuno:
>
> | Ítem                      |Precio $|
> |---------------------------|------|
> | Café americano            |    5 |
> | Café con leche            |    7 |
> | Sandwich de jamón y queso |   10 |
> | Jugo de frutas natural              |    7 |
>
> Y otro menú para el resto del día:
>
> | Ítem                      |Precio|
> |---------------------------|------|
> |**Hamburguesas**           |   **$**   |
> |Hamburguesa simple         |    10|
> |Hamburguesa doble          |    15|
> |**Acompañamientos**        |   **$**   |
> |Papas fritas               |     5|
> |Aros de cebolla            |     5|
> |**Para tomar**             |   **$**   |
> |Agua 500ml                 |     5|
> |Agua 750ml                 |     7|
> |Bebida/gaseosa 500ml       |     7|
> |Bebida/gaseosa 750ml       |     10|
>
> **Importante:** Los clientes pueden escoger entre hamburguesas de res,
> de pollo, o vegetariana. Además, por $ 1 adicional, pueden agregarle queso
> o huevo.
>
> Nuestros clientes son bastante indecisos, por lo que es muy común que cambien
> su pedido varias veces antes de finalizarlo.

La interfaz debe mostrar los dos menús (desayuno y resto del día), cada uno
con todos sus _productos_. El usuario debe poder ir eligiendo qué _productos_
agregar y la interfaz debe ir mostrando el _resumen del pedido_ con el
costo total.

## Planeamiento


### Definición del producto

El [_Product Owner_](https://youtu.be/r2hU7MVIzxs) nos
presenta este _backlog_ que es el resultado de su trabajo con el cliente hasta
hoy.

***

#### [Historia de usuario 1] Mesero/a debe poder tomar pedido de cliente

Yo como meserx quiero tomar el pedido de un cliente para no depender de mi mala
memoria, para saber cuánto cobrar, y enviarlo a la cocina para evitar errores y
que se puedan ir preparando en orden.

##### Criterios de aceptación

Lo que debe ocurrir para que se satisfagan las necesidades del usuario)

* Anotar nombre de cliente.
* Agregar productos al pedido.
* Eliminar productos.
* Ver resumen y el total de la compra.
* Enviar pedido a cocina (guardar en alguna base de datos).
* Se ve y funciona bien en una _tablet_

##### Definición de terminado

Lo acordado que debe ocurrir para decir que la historia está terminada.

* Debes haber recibido _code review_ de al menos una compañera.
* Haces _test_ unitarios y, además, has testeado tu producto manualmente.
* Hiciste _tests_ de usabilidad e incorporaste el _feedback_ del usuario.
* Desplegaste tu aplicación y has etiquetado tu versión (git tag).

***

#### [Historia de usuario 2] Jefe de cocina debe ver los pedidos

Yo como jefx de cocina quiero ver los pedidos de los clientes en orden y
marcar cuáles están listos para saber qué se debe cocinar y avisar a lxs meserxs
que un pedido está listo para servirlo a un cliente.

##### Criterios de aceptación

* Ver los pedidos ordenados según se van haciendo.
* Marcar los pedidos que se han preparado y están listos para servirse.
* Ver el tiempo que tomó prepara el pedido desde que llegó hasta que se
  marcó como completado.

##### Definición de terminado

* Debes haber recibido _code review_ de al menos una compañera.
* Haces _test_ unitarios y, además, has testeado tu producto manualmente.
* Hiciste _tests_ de usabilidad e incorporaste el _feedback_ del usuario.
* Desplegaste tu aplicación y has etiquetado tu versión (git tag).

***

#### [Historia de usuario 3] Meserx debe ver pedidos listos para servir

Yo como meserx quiero ver los pedidos que están preparados para entregarlos
rápidamente a los clientes que las hicieron.

##### Criterios de aceptación

* Ver listado de pedido listos para servir.
* Marcar pedidos que han sido entregados.

##### Definición de terminado

* Debes haber recibido _code review_ de al menos una compañera.
* Haces _test_ unitarios y, además, has testeado tu producto manualmente.
* Hiciste _tests_ de usabilidad e incorporaste el _feedback_ del usuario.
* Desplegaste tu aplicación y has etiquetado tu versión (git tag).
* Los datos se deben mantener íntegros, incluso después de que un pedido ha
  terminado. Todo esto para poder tener estadísticas en el futuro.

***

***
### 3.2 Prototipo de alta fidelidad
Se desarrolló un prototipo considerando las siguientes vistas: waiter,chef y admin.
Puede visualizar el proyecto en el [siguiente enlace](https://www.figma.com/proto/zujgLB9m5sHkRWqnAaO502/Burger-Queen?node-id=27%3A387&scaling=scale-down&page-id=0%3A1&starting-point-node-id=26%3A147&show-proto-sidebar=1).

## 4. 📝Resultado final
### 4.1 Vista waiter
![waiter](https://firebasestorage.googleapis.com/v0/b/burger-queen-peru.appspot.com/o/images%2Fwaite)
### Vista chef
![chef](https://firebasestorage.googleapis.com/v0/b/burger-queen-peru.appspot.com/o/images%2Fchefgif%20(1).gif?alt=media&tok)
### 4.3 Vista admin
![admin](https://firebasestorage.googleapis.com/v0/b/burger-queen-peru1).gif?alt=media&token=2f91e114-42ae-4c51-905f-b3f8f3d8327d)

## 5. 🔧Tecnologías utilizadas:
* Angular
* TypeScript
* JavaScript
* HTML
* CSS / SCSS
* Bootstrap
* Jasmine
* Karma
* Firebase
* Git and GitHub
