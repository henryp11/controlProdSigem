# App web de Control de producción con conexión a Sigem

App Web creada con REACT 17 que controla las ordenes de producción ingresadas previamente en el ERP Sigem, el cual enviará mediante su API la información de las ordenes, para que el la app se visualice el detalle de cada una, como sus productos terminados y sus recetas de producción y materias primas.

Dentro de cada orden se podrá editar las cantidades de materia prima a usar, cambiar la materia prima original por otra, gestionar los procesos de producción de cada producto terminado, controlar fechas y horas de proceso, y mediante una autorización de un administrador o jefe de producción todos estos cambios registrados por los operarios se reflejarán directamente en Sigem, para que se procesen automáticamente las ordenes en el ERP.

(Esta versión funciona con react router DOM V5, para leer la app desde un subdirectorio en el servidor donde se alojará.)
