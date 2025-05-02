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
│   ├── index.tsx
│   ├── routes/
│   └── providers/
│
├── /shared             # Módulos reutilizables en toda la app (botones, hooks, utils)
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── types/
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
├── /widgets            # Componentes intermedios (composición entre features y UI)
│   └── Header/
│       ├── Header.tsx
│       ├── styles.module.scss
│       └── index.ts
│
├── /pages              # Páginas del router (estructura de vistas)
│   └── HomePage/
│       ├── HomePage.tsx
│       ├── styles.module.scss
│       └── index.ts
│
├── /processes          # Flujos de negocio compuestos (login, checkout, etc.)
│   └── authFlow/
│       ├── LoginProcess.tsx
│       └── index.ts
│
├── /shared/api         # Configuración y cliente de API (axios, fetch, etc.)
│   └──client.ts
│   └── endpoints.ts
│── .env                 # Variables de entorno
│── package.json         # Dependencias y scripts del proyecto
└── README.md            # Documentación inicial
```
