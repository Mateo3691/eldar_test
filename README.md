# EldarTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Versiones necesarias

Angular CLI: 18.2.5
Node: 20.12.2
Package Manager: npm 10.5.0

## Levantar el proyecto

- Ejecutar el proyecto 'npm install' en la raiz del proyecto.

## Correr el proyecto

comando 'npm start'

## Cómo probar el proyecto

- La pantalla de inicio es el login, en donde se ve que los campos 'Usuario' y 'Contraseña' tienen validaciones de longitud y de requeridos.
- Para acceder a la vista del Admin, es necesario que el valor que ingresen en el campo 'Usuario' comience con la palabra 'admin', como por ejemplo el usuario 'Admin123'. Esta es una forma de manejar el rol en base al login sin un backend y sin el uso de botones u tras acciones para indicar el rol.
- Para acceder a la vista de User, solo hay que ingresar un valor en el campo 'Usuario' que NO comience con la palabra 'admin'.
- En la vista del Admin hay un botón 'Agregar' para agregar items. El botón abre un modal en el cual se agregan los datos que se quiere que tenga el nuevo Item de la tabla. Una vez agregado se puede ver en el margen superior derecho un toaster que nos indica que la operación fue exitosa o que falló. Los nuevos items se colocan al final de la tabla.
- El filtro que esta presente en la tabla de cada vista, funciona de forma tal que lo que se ingrese va a buscar coincidencia en toda la tabla, sin filtrar por alguna columna en especifico.
- Si se intenta ir a la ruta '/dashboard' sin haber completado el login, no deja ingresar y se mantiene en el login.

## Notas
- Se dejaron los componentes en el shared sin ninguna invocación a alguna api, ya que eso sería una mala práctica al darle demasiada responsabilidad a un componente que se presume reutilizable
- Se implementó una estructura escalable del proyecto.

