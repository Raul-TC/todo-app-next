# 📋 To-Do List

## 🚀 Descripción
To-Do List es una aplicación sencilla que incluye sesiones de usuario para gestionar tareas, permitiendo agregar, marcar como completadas y eliminar tareas de manera eficiente.

![Login](/public/login.png)
![Home](/public/homePage.png)
![Tarea Agregada](/public/taskAdded.png)
![Tarea Actualizada](/public/updatedTask.png)
![Tarea Eliminada](/public/deletedTask.png)

## ✨ Características
- Agregar nuevas tareas
- Marcar tareas como completadas
- Eliminar tareas
- Filtrar tareas (pendientes / completadas)
- Persistencia de datos con base de datos
- Modo Oscuro
- Drag and Drop de Tareas
- Login
- Pruebas automatizadas con Cypress

## 🛠 Tecnologías Utilizadas
- **Frontend:** Next.js, React, Tailwind CSS, Zustand
- **Testing:** Cypress

## 📥 Instalación y Uso

### 🔧 Clonar el repositorio
```bash
git clone https://github.com/Raul-TC/todo-app-next.git
cd todo-app-next
```

### 📦 Instalar dependencias
```bash
npm install
```

### ▶ Ejecutar el proyecto
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`

### 🧪 Ejecutar pruebas con Cypress
```bash
npm run cypress run
```

![Tests](/public/cypressTests.png)

## 📂 Estructura del Proyecto
```
/app
├── components  # Componentes reutilizables
├── actions      # Server Component para el login
├── hooks       # Hooks personalizados
├── api    # Llamadas a API personalizadas
├── auth     # Ruta Personalizada del login
├── stores     # State Global con Zustand
├── register     # Ruta Personalizada del registro de usuarios
/cypress
├── e2e  # Test E2E 
├── fixtures  # Datos de Prueba 
├── selectors  # Selectores de Elementos 
├── support  # Comandos y Clases con metodos reutilizables 
```

## 📞 Contacto
Creado por [Raul-TC](https://github.com/Raul-TC). ¡Siéntete libre de contactarme! 🚀
