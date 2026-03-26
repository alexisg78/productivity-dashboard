# Finance Manager Dashboard

Aplicación web tipo **Productivity & Finance Dashboard** desarrollada con **Angular 21 + Tailwind CSS**, orientada a la gestión personal de gastos y tareas mediante una arquitectura escalable basada en features.

Este proyecto fue diseñado como práctica profesional para demostrar:

- Arquitectura Angular moderna
- Componentes reutilizables
- UI escalable
- Organización modular
- Buenas prácticas
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

Actualmente la persistencia se implementa mediante **localStorage** gestionado desde un store global basado en Angular Signals, funcionando como capa temporal hasta futura integración con backend.

---

## Tecnologías utilizadas

- Angular 21
- TypeScript
- Tailwind CSS v4
- Angular CDK Drag & Drop
- Angular Signals (global state management layer)
- Arquitectura feature-based
- LocalStorage (persistencia temporal)

---

## Cómo ejecutar el proyecto

Seguí estos pasos para ejecutar la aplicación localmente:

### 1. Clonar el repositorio

```bash
git clone https://github.com/alexisg78/productivity-dashboard.git

```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar el servidor de desarrollo

```bash
ng serve
```

### 4. Luego abrir en el navegador:

```bash
http://localhost:4200
```

### Requisitos previos

Asegurarse de tener instalado:

```
Node.js (versión LTS recomendada)
Angular CLI
```

Instalar Angular CLI si no está disponible:

```
npm install -g @angular/cli
```

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

---

### Core

Contiene servicios singleton compartidos a nivel aplicación:

- store global de gastos basado en Angular Signals
- capa de persistencia centralizada mediante localStorage
- espacio preparado para futura autenticación
- servicios globales de configuración

---

### Shared

Componentes reutilizables:

- Modal genérico configurable
- Tabla genérica
- Paginador reutilizable

---

### Features

Módulos funcionales independientes:

- dashboard
- expenses
- tasks

Esta estructura permite escalar fácilmente el proyecto hacia una arquitectura enterprise-ready.

---

## Funcionalidades implementadas

### Dashboard

- Tarjetas de estadísticas conectadas a un store global de gastos basado en Angular Signals con selectores computados y sincronización automática de estado entre features.

### Expenses Module

Permite:

- Crear gastos
- Editar gastos
- Eliminar gastos
- Persistencia en localStorage gestionada mediante store global basado en Angular Signals

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

- Dashboard summary stat cards powered by a global signal-based state store with computed selectors and automatic UI synchronization.
- Expenses CRUD module
- Kanban task board with drag & drop
- Reusable modal component
- Reusable generic table with pagination

Data persistence currently uses **localStorage**, managed through a centralized signal-based state service, acting as a temporary persistence layer before backend integration.

---

## Tech Stack

- Angular 21
- TypeScript
- Tailwind CSS v4
- Angular CDK Drag & Drop
- Angular Signals (global state management layer)
- Feature-based scalable architecture

---

## Running the project

Follow these steps to run the application locally:

### 1. Clone the repository

```bash
git clone https://github.com/alexisg78/productivity-dashboard.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
ng serve
```

### 4. Then open your browser at:

```bash
http://localhost:4200
```

### Prerequisites

Make sure you have installed:

```bash
Node.js (LTS version recommended)
Angular CLI
```

Install Angular CLI if not available:

```
npm install -g @angular/cli
```

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

### Core

Contains application-wide singleton services:

- global expense signal-based state store
- centralized persistence layer using localStorage
- prepared space for future authentication services
- global configuration utilities

---

## State Management

The application implements a lightweight global state layer using Angular Signals:

- centralized expense state store
- computed selectors (total / amount)
- automatic UI synchronization across dashboard and feature modules
- localStorage persistence handled inside the state service

This approach prepares the project for future migration to backend APIs or SignalStore / NgRx if needed.

---

## Implemented Features

### Dashboard

Summary stat cards powered by a global expense signal-based state store with computed selectors and automatic state synchronization across features.

### Expenses Module

Includes:

- Create expense
- Update expense
- Delete expense
- Local persistence layer managed through a centralized signal-based state service

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
- modern Angular development practices including signal-based global state management

Future versions will include fullstack capabilities.

```

```
