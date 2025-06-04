# 📌 Estructura y Arquitectura del Proyecto

Este documento describe la estructura del proyecto y las tecnologías utilizadas.

## 🛠️ Tecnologías Utilizadas
- **Frontend:** React, Vite, Tailwind, Typescript

---

# 📁 Estructura de Carpetas

## 🏗️ Frontend (React)

```
/frontend
/src
│
├── /app                # Punto de entrada de la aplicación (config, routes, etc.)
│   ├── App.tsx
│   ├── routes/
│   └── providers/
│
│
├── /entities           # Modelos y lógica de dominio (interfaces, tipos, lógica pura)
│   └── user/
│       ├── model.ts
│       └── valueObjects.ts
│
├── /features           # Casos de uso agrupados por funcionalidad
│   └── auth/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── index.ts
│
├── /pages              # Páginas del router (estructura de vistas)
│   └── HomePage/
│       ├── HomePage.tsx
│       ├── styles.module.scss
│       └── index.ts
│
├── /shared             # Módulos reutilizables en toda la app (botones, hooks, utils)
│   ├── api/
│   ├── components/
│   ├── hooks/
│   ├── types/
│   └── utils/
│── .env                 # Variables de entorno
│── package.json         # Dependencias y scripts del proyecto
└── README.md            # Documentación inicial
```
