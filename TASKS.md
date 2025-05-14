# 📌 Tasks del Proyecto

# 📁 Historias de Usuario

## **🔹 EPIC 1: Registro y Autenticación**  

### 📌 **HU-01: Registro de Usuario** [X]
**Como** visitante, **quiero** registrarme en la plataforma con mi correo o redes sociales, **para** poder acceder al programa de fidelización.  
**Criterios de Aceptación:**  
- El usuario puede registrarse con correo/contraseña o con Google/Facebook mediante Auth0.
- Se debe validar que el correo no esté duplicado.  

### 📌 **HU-02: Inicio de Sesión** [X]
**Como** usuario registrado, **quiero** iniciar sesión en la aplicación, **para** acceder a mis puntos y beneficios.  
**Criterios de Aceptación:**  
- El usuario debe poder iniciar sesión con correo/contraseña.  
- Se muestra un mensaje de error si las credenciales son incorrectas.

---  

## **🔹 EPIC 2: Gestión de Puntos y Compras**  

### 📌 **HU-03: Presentar Ticket de Compra**
**Como** usuario, **quiero** presentar mis tickets de compra en el centro comercial, **para** que se me acrediten los puntos correspondientes.  
**Criterios de Aceptación:**  
- El usuario debe presentar su ticket en el punto de información.  
- El empleado del centro comercial registra la compra con el número de ticket y el monto.
- Se calculan los puntos según el monto gastado.  

### 📌 **HU-04: Acreditación de Puntos**
**Como** empleado del centro comercial, **quiero** registrar manualmente las compras de los clientes, **para** que acumulen puntos en la aplicación.  
**Criterios de Aceptación:**  
- Se registra la compra asociándola a un usuario.  
- Se almacena el historial de compras y puntos otorgados.  

### 📌 **HU-05: Visualización de Historial de Puntos**
**Como** usuario, **quiero** ver el historial de mis transacciones de puntos, **para** entender cómo los gané o gasté.  
**Criterios de Aceptación:**  
- Se muestra una lista con los movimientos de puntos por usuario.  
- Se muestran los canjes de puntos realizados.  
- Se indica la fecha y el motivo de cada movimiento.  

---  

## **🔹 EPIC 3: Gestión de Recompensas y Stock**  

### 📌 **HU-06: Cargar Nueva Recompensa**
**Como** administrador, **quiero** agregar nuevas recompensas al sistema, **para** ofrecer más opciones a los clientes.
**Criterios de Aceptación:**  
- Se puede definir nombre, descripción, imagen y puntos requeridos.
- Se debe asignar una cantidad de stock disponible.

### 📌 **HU-07: Modificar Recompensas**
**Como** administrador, **quiero** modificar o eliminar recompensas, **para** mantener actualizado el catálogo. 
**Criterios de Aceptación:**  
- Solo los administradores pueden realizar cambios.
- Se puede modificar cualquier campo menos el stock.

### 📌 **HU-08: Gestión de Stock de Recompensas**
**Como** administrador, **quiero** actualizar el stock de recompensas, **para** evitar que los clientes intenten canjear beneficios agotados.
**Criterios de Aceptación:**  
- Se puede aumentar o reducir el stock manualmente.
- Cuando se genera un movimiento de stock, se debe actualizar el balance del reward.
- Se puede ver si una recompensa se queda sin stock.

---  

## **🔹 EPIC 4: Canje de Recompensas**  

### 📌 **HU-09: Explorar Recompensas Disponibles** [X]
**Como** usuario, **quiero** ver el catálogo de beneficios y experiencias disponibles, **para** decidir en qué gastar mis puntos.  
**Criterios de Aceptación:**  
- Se muestra una lista de recompensas con su imagen, descripción y costo en puntos.  
- Se indica la disponibilidad de stock de cada recompensa.  

### 📌 **HU-10: Canjear Puntos por Recompensas**
**Como** usuario, **quiero** canjear mis puntos por un beneficio, **para** disfrutar las recompensas del programa de fidelización.  
**Criterios de Aceptación:**  
- Se valida que el usuario tenga suficientes puntos.  
- Se descuenta el saldo de puntos correspondiente al usuario.  
- Se debe generar el movimiento de stock correspondiente a la cantidad de canje.
- Se genera un comprobante de canje en formato QR.  

### 📌 **HU-11: Confirmar Canje en el Centro Comercial**
**Como** usuario, **quiero** presentar mi comprobante de canje en el punto de información, **para** recibir mi beneficio.  
**Criterios de Aceptación:**  
- El empleado verifica el código del comprobante en el sistema.  
- Se obtienen los datos de redencion por id.
- Se marca el beneficio como "entregado".  

---  

### 📌 **HU-15: Seguridad en la Plataforma**
**Como** usuario, **quiero** cque mi información esté protegida, **para** evitar accesos no autorizados.
**Criterios de Aceptación:**  
- Se implementa autenticación.
- Se requiere HTTPS para todas las conexiones.

---  

### 📌 Post MVP

## **🔹 EPIC 5: Reportes y Estadísticas**  

### 📌 **HU-12: Ver Estadísticas de Canjes y Compras**  
**Como** administrador, **quiero** ver reportes de compras, puntos acumulados y beneficios canjeados, **para** evaluar la efectividad del programa de fidelización.
**Criterios de Aceptación:**  
- Se muestran gráficos con datos sobre puntos otorgados y canjes realizados.
- Se pueden filtrar reportes por tienda y período de tiempo.

### 📌 **HU-13: Ver Actividad de Usuarios**  
**Como** administrador, **quiero** consultar la actividad de un usuario específico, **para** gestionar consultas o reclamos.
**Criterios de Aceptación:**  
- Se muestra el historial de compras, puntos y canjes de cada usuario.
- Se puede buscar por nombre o correo electrónico.

---  

## **🔹 EPIC 6: Infraestructura y Seguridad**  

### 📌 **HU-14: Gestión de Roles y Permisos**  
**Como** administrador, **quiero** gestionar los roles de los usuarios, **para** controlar quién tiene acceso a cada sección del sistema.
**Criterios de Aceptación:**  
- Se pueden asignar roles de usuario normal, empleado y administrador.
- Los empleados solo pueden validar compras y canjes.