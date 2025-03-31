# 📦 Sistema de Gestión de Envíos y Rutas Logísticas  

## 🚀 Versión 3.0  

**Elaborado por:** Guillermo Valencia  

Este proyecto es una solución completa (frontend y backend) para gestionar el envío de paquetes, optimizar rutas de entrega y permitir a los clientes rastrear sus pedidos en tiempo real. La solución garantiza seguridad, eficiencia y escalabilidad.  

---

## 📌 **Requerimientos Técnicos**  

### 🔧 **Backend**  
- **Framework:** Express o Fastify  
- **Lenguaje:** TypeScript  
- **Base de datos:** MySQL  
- **Caching:** Redis  
- **Autenticación y Seguridad:** JWT  
- **Patrones de Arquitectura:** Clean Architecture  
- **Pruebas:** Unitarias y de integración  
- **Documentación:** Swagger  

### 🎨 **Frontend**  
- **Framework:** React  
- **Arquitectura:** Microfrontends (Webpack Module Federation o Single SPA)  
- **Estado Global:** Redux o Context API  
- **UI:** TailwindCSS o Material-UI  
- **Rutas:** React Router  
- **Seguridad:** Manejo de autenticación con JWT  
- **Pruebas:** Jest/React Testing Library  

---

## 📖 **Historias de Usuario (HU)**  

### 🏷 **HU1 - Registro y autenticación de usuarios**  
✅ Registro e inicio de sesión para gestionar envíos.  
✅ Validación de credenciales y generación de token JWT.  
✅ Almacenar token en localStorage/SessionStorage.  

### 📦 **HU2 - Creación de órdenes de envío**  
✅ Registrar envíos con datos del paquete (peso, dimensiones, tipo de producto).  
✅ Validar dirección de destino.  
✅ Estado inicial de la orden: "En espera".  
✅ Notificación de confirmación.  

### 🚚 **HU3 - Asignación de rutas a los envíos**  
✅ Endpoint para asignar una orden de envío a una ruta.  
✅ Registro del transportista asignado.  
✅ Validación de disponibilidad del transportista.  
✅ Dashboard administrativo para asignar rutas.  

### 📍 **HU4 - Seguimiento del estado del envío**  
✅ Endpoint para consultar el estado de un envío.  
✅ Redis para almacenar estados recientes.  
✅ Actualización del estado en tiempo real (WebSockets o polling).  

### 📊 **HU5 - Reportes y desempeño logístico**  
✅ Endpoint para consultar envíos con filtros avanzados.  
✅ Métricas de desempeño (tiempo de entrega, transportistas).  
✅ Uso de Redis para optimizar consultas.  
✅ Tabla de reportes y gráficos interactivos.  

---
### 📊 **Base de Datos**  


![image](https://github.com/user-attachments/assets/82cedc5c-f435-4ea7-888c-afae48f3f2de)


## 🛠 **Instrucciones para Instalación y Ejecución**  

### 📌 **Clonar el Repositorio**  

```bash
Ejecucion de los proyectos 

npm start 

```bash
git clone https://github.com/jnivia97/app-coordinadora/.git
git clone https://github.com/jnivia97/frontend-coordinadora/.git



