# API REST - Node.js & Express (MVC)

API RESTful desarrollada con **Node.js**, **Express** y **PostgreSQL**, estructurada bajo el patrón arquitectónico **Modelo-Vista-Controlador (MVC)** dentro del directorio `src/`. Cuenta con autenticación y autorización mediante tokens JWT, hashing de contraseñas con bcrypt, middlewares de validación y suite de pruebas unitarias/mocks con Jest.

## 🛠 Tecnologías Utilizadas

* **Entorno de ejecución:** Node.js

* **Framework web:** Express

* **Base de datos:** PostgreSQL (`pg`)

* **Autenticación y Seguridad:** JSON Web Tokens (`jsonwebtoken`), `bcrypt`, `cors`

* **Variables de entorno:** `dotenv`

* **Testing:** Jest

* **Herramientas de desarrollo:** Nodemon, Postman

## 📁 Estructura del Proyecto

La estructura del repositorio sigue la distribución mostrada a continuación:

```
api-node/
├── Capturas de pantalla/         # Capturas de pantalla de pruebas en Postman
├── node_modules/                 # Dependencias instaladas
├── src/
│   ├── config/
│   │   └── db.js                 # Configuración del pool / conexión a PostgreSQL
│   ├── controlador/
│   │   ├── publicacionesControlador.js
│   │   └── usuarioControlador.js
│   ├── middlewares/
│   │   ├── verificarPassword.js  # Middleware de validación de contraseñas
│   │   ├── verificarToken.js     # Middleware de autenticación JWT
│   │   └── verificarUpdate.js    # Middleware de validación para actualización
│   ├── modelo/
│   │   ├── publicacionesModelo.js
│   │   └── usuarioModelo.js
│   ├── rutas/
│   │   ├── publicacionesRutas.js # Endpoints del recurso publicaciones
│   │   └── usuarioRutas.js       # Endpoints del recurso usuarios
│   └── tests/
│       ├── mocks.test.js         # Mocks para pruebas
│       └── validadores.test.js   # Pruebas unitarias de validadores
├── .env                          # Variables de entorno (credenciales locales)
├── .gitignore                    # Archivos y carpetas ignorados por Git
├── index.js                      # Punto de entrada de la aplicación
└── package.json                  # Dependencias y scripts del proyecto

```

## ⚙️ Requisitos Previos

Asegúrate de contar con el siguiente software instalado y en ejecución:

* [Node.js](https://nodejs.org/) (versión LTS recomendada)

* [PostgreSQL](https://www.postgresql.org/) (servicio activo local o remotamente)

* Gestor de paquetes `npm`

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```
git clone https://github.com/Alex00011100/api-node.git
cd api-node

```

### 2. Instalar dependencias

Instala todas las librerías necesarias con:

```
npm install

```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto (`api-node/.env`) con las credenciales correspondientes a tu entorno:

```
# Servidor
PORT=3000

# Base de datos PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario_postgres
DB_PASSWORD=tu_contraseña_postgres
DB_NAME=nombre_de_tu_base_de_datos

# Seguridad JWT
JWT_SECRET=tu_clave_secreta_super_segura

```

> **Nota:** La base de datos indicada en `DB_NAME` debe existir previamente en tu servidor PostgreSQL.

## 💻 Ejecución del Proyecto

Scripts disponibles definidos en el archivo `package.json`:

* **Modo desarrollo (recarga automática con Nodemon):**

  ```
  npm run dev
  
  ```

* **Modo producción:**

  ```
  npm start
  
  ```

* **Ejecución de pruebas (Jest):**

  ```
  npm run test
  
  ```

El servidor quedará disponible en `http://localhost:3000` (o el puerto configurado en el archivo `.env`).

## 📌 Endpoints de la API

### 👤 Rutas de Usuarios (`src/rutas/usuarioRutas.js`)

| Método | Endpoint | Middlewares aplicados | Descripción | 
 | ----- | ----- | ----- | ----- | 
| `POST` | `/registrar` | `validarPassword` | Valida la contraseña y registra un nuevo usuario. | 
| `POST` | `/login` | *Ninguno* | Autentica credenciales y devuelve el token JWT. | 
| `GET` | `/perfil` | `verificarToken` | Devuelve la información del usuario autenticado. | 

### 📝 Rutas de Publicaciones (`src/rutas/publicacionesRutas.js`)

| Método | Endpoint | Middlewares aplicados | Descripción | 
 | ----- | ----- | ----- | ----- | 
| `GET` | `/` | *Público* | Obtiene el listado completo de publicaciones. | 
| `POST` | `/` | `verificarToken` | Crea una nueva publicación asociada al usuario logueado. | 
| `PUT` | `/:id` | `verificarToken`, `verificarUpdate` | Modifica una publicación verificando permisos de autoría. | 
| `DELETE` | `/:id` | `verificarToken` | Elimina una publicación existente por su ID. | 

#### Autenticación en peticiones protegidas:

Para consumir endpoints con el middleware `verificarToken`, envía el token en los encabezados HTTP de la solicitud:

```
Authorization: Bearer <TU_TOKEN_JWT>

```

## 🧪 Pruebas con Postman y Tests

* **Evidencias en Postman:**

  Todas las peticiones y respuestas exitosas (códigos `200`, `201`, etc.) e interceptación de errores han sido documentadas con capturas de pantalla ubicadas en la carpeta:

  ```
  📁 /Capturas de pantalla
  
  ```

* **Tests automatizados:**

  Ubicados en `src/tests/`:

  * `validadores.test.js`: Pruebas de reglas de validación (por ejemplo, formato y seguridad de contraseñas).

  * `mocks.test.js`: Pruebas con simulación de llamadas y lógica aislada.