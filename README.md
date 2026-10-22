# Préstamos Lab — 0902-23-10306

Aplicación web para controlar el préstamo de equipo del laboratorio de cómputo: qué equipo está prestado, a quién y hasta cuándo.

Hecha con **React + TypeScript + Vite**, estilos con **CSS Modules** y una API REST simulada con **json-server**.

## Variante asignada (último dígito del carné: 6)

| Categorías | Máximo de días | Regla adicional |
|---|---|---|
| Monitor, Teclado, Mouse | 5 | El Encabezado muestra cuántos préstamos están vencidos |

## Requisitos

- Node.js 18 o superior
- npm

## Instalación y ejecución

1. **Instalar dependencias**

   ```bash
   npm install
   ```

2. **Crear el archivo `.env`** a partir del ejemplo (define `VITE_API_URL`):

   ```bash
   # Linux / macOS / Git Bash
   cp .env.example .env
   # Windows (CMD)
   copy .env.example .env
   ```

3. **Levantar la API** (json-server en el puerto 3001, usa `db.json`). Dejar esta terminal abierta:

   ```bash
   npm run api
   ```

4. **Ejecutar el frontend** en otra terminal:

   ```bash
   npm run dev
   ```

   Abrir la URL que muestra Vite (por defecto http://localhost:5173).

## Endpoints usados

| Método | Endpoint | Uso |
|---|---|---|
| GET | `/equipos` | Cargar el inventario |
| GET | `/prestamos?devuelto=false` | Cargar préstamos activos |
| POST | `/prestamos` | Registrar un préstamo |
| PATCH | `/equipos/:id` | Cambiar `disponible` |
| PATCH | `/prestamos/:id` | Marcar `devuelto: true` |

## Estructura

```
src/
  components/   componentes de presentación (TarjetaEquipo, ListaEquipos, Encabezado, FormularioPrestamo, TablaPrestamos…)
  pages/        vistas principales (InventarioPage, PrestamosPage)
  hooks/        custom hooks (useEquipos, usePrestamosActivos)
  services/     funciones tipadas que llaman a la API (api.ts)
  types/        interfaces TypeScript (Equipo, Prestamo)
  utils/        validaciones y manejo de fechas
  config.ts     carné, título, categorías y máximo de días de la variante
  App.tsx
db.json         datos de la API (json-server)
```

## Notas

- `db.json` se modifica al registrar o devolver préstamos. Para volver a los datos iniciales: `git checkout db.json`.
- Para ver el estado de error de la API basta con detener `npm run api` y recargar la página; el botón **Reintentar** vuelve a cargar los datos cuando la API está encendida otra vez.
