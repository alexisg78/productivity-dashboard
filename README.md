# Finance Manager Dashboard

Aplicación web tipo **Productivity & Finance Dashboard** desarrollada con **Angular 21 + Tailwind CSS**, orientada a la gestión personal de gastos y tareas mediante una arquitectura escalable basada en features.

Este proyecto fue diseñado como práctica profesional para demostrar:

- Arquitectura Angular moderna
- Componentes reutilizables
- UI escalable
- Organización modular
- Buenas prácticas de commits
- Preparación para futura integración backend

---

# Español

## Descripción

Finance Manager es una aplicación web orientada a la gestión personal de productividad que incluye:

- Dashboard con tarjetas estadísticas
- CRUD de gastos con persistencia local
- Tablero Kanban estilo Trello con drag & drop
- Tabla genérica reutilizable con paginación
- Modal reutilizable configurable
- Arquitectura feature‑based escalable

Actualmente la persistencia se implementa mediante **localStorage** como capa temporal hasta futura integración con backend.

---

## Tecnologías utilizadas

- Angular 21
- TypeScript
- Tailwind CSS v4
- Angular CDK Drag & Drop
- Arquitectura feature-based
- LocalStorage (persistencia temporal)

---

## Arquitectura del proyecto

El proyecto utiliza una arquitectura modular escalable basada en features:

```
src/app/

core/
features/
layout/
shared/
```

### Shared

Componentes reutilizables:

- Modal genérico configurable
- Tabla genérica
- Paginador reutilizable

### Features

Módulos funcionales independientes:

- dashboard
- expenses
- tasks

Esta estructura permite escalar fácilmente el proyecto hacia una arquitectura enterprise-ready.

---

## Funcionalidades implementadas

### Dashboard

- Tarjetas de estadísticas (UI base preparada para lógica futura)

### Expenses Module

Permite:

- Crear gastos
- Editar gastos
- Eliminar gastos
- Persistencia en localStorage

Utiliza tabla genérica reutilizable.

### Tasks Module

Incluye:

- Tablero Kanban
- Drag & Drop entre columnas
- Gestión visual de estados

Implementado usando Angular CDK.

---

## Componentes reutilizables

Este proyecto incluye componentes diseñados para reutilización:

### Generic Table

Soporta:

- Columnas dinámicas
- Acciones configurables
- Paginación
- Tipado fuerte mediante interfaces

### Modal Component

Permite:

- Contenido dinámico
- Reutilización en múltiples features
- Integración con formularios

---

## Roadmap

Próximas mejoras planificadas:

- Integración backend (NestJS o Node.js)
- Persistencia en base de datos
- Autenticación JWT
- Dashboard con métricas reales
- Filtros avanzados en tabla
- Responsive improvements

---

# English

## Description

Finance Manager Dashboard is a **productivity-focused Angular application** designed to demonstrate scalable frontend architecture and reusable UI components.

Current modules include:

- Dashboard summary stat cards
- Expenses CRUD module
- Kanban task board with drag & drop
- Reusable modal component
- Reusable generic table with pagination

Data persistence currently uses **localStorage** as a temporary storage layer before backend integration.

---

## Tech Stack

- Angular 21
- TypeScript
- Tailwind CSS v4
- Angular CDK Drag & Drop
- Feature-based architecture

---

## Project Structure

```
src/app/

core/
features/
layout/
shared/
```

This structure follows scalable Angular architecture best practices.

---

## Implemented Features

### Dashboard

Summary stat cards UI prepared for future analytics logic.

### Expenses Module

Includes:

- Create expense
- Update expense
- Delete expense
- Local persistence layer

Built using reusable generic table component.

### Tasks Module

Includes:

- Kanban board
- Drag & Drop between columns
- Visual state management

Implemented using Angular CDK Drag & Drop.

---

## Reusable Components

### Generic Table Component

Supports:

- Dynamic columns
- Configurable actions
- Pagination
- Strong typing via interfaces

### Modal Component

Supports:

- Dynamic content injection
- Feature reuse
- Form integration

---

## Future Improvements

Planned enhancements:

- Backend integration (NestJS / Node.js)
- Database persistence layer
- JWT authentication
- Dashboard analytics logic
- Advanced filtering system
- Mobile responsiveness improvements

---

## Purpose of the Project

This project was built as part of a professional Angular portfolio to demonstrate:

- scalable architecture decisions
- reusable component design
- clean project structure
- modern Angular development practices

Future versions will include fullstack capabilities.

