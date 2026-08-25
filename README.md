# AMIGO MED 🩺🤖

> **“Tu compañero para recordar y confirmar tus tomas”**

**AMIGO MED** es una aplicación web moderna, accesible y funcional diseñada específicamente para ayudar a las personas adultas mayores y sus cuidadores a recordar, organizar y confirmar la toma de sus medicamentos a tiempo.

---

## 📋 Tabla de Contenidos
1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Características Principales](#características-principales)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Instrucciones de Instalación y Ejecución](#instrucciones-de-instalación-y-ejecución)
5. [Manual de Usuario](#manual-de-usuario)
   - [1. Pantalla de Bienvenida](#1-pantalla-de-bienvenida)
   - [2. Panel Principal (Dashboard)](#2-panel-principal-dashboard)
   - [3. Gestión de Medicamentos](#3-gestión-de-medicamentos)
   - [4. Historial y Adherencia](#4-historial-y-adherencia)
   - [5. Contactos Importantes y Emergencia](#5-contactos-importantes-y-emergencia)
   - [6. Perfil y Ajustes de Accesibilidad](#6-perfil-y-ajustes-de-accesibilidad)
   - [7. Centro de Ayuda y Simulador](#7-centro-de-ayuda-y-simulador)
6. [Aviso de Responsabilidad Médica](#aviso-de-responsabilidad-médica)
7. [Créditos](#créditos)

---

## 🎯 Descripción del Proyecto

AMIGO MED nace a partir de una investigación con personas adultas mayores donde se evidenció que el 100% toma medicamentos y suele olvidar alguna de sus tomas debido a la complejidad de las herramientas digitales convencionales.

Por esta razón, AMIGO MED prioriza:
- **Simplicidad y claridad:** Flujos de pocos pasos y sin menús confusos.
- **Accesibilidad:** Botones grandes (área táctil ≥ 48px), selector de tamaño de fuente (`A`, `A+`, `A++`) y modo de alto contraste.
- **Acompañamiento cercano:** **AmigoBot**, la mascota robot médico que acompaña y felicita al usuario en cada logro.
- **Feedback multisensorial:** Sonidos suaves (Web Audio API) y avisos visuales claros.
- **Persistencia local:** Toda la información se guarda de forma segura en `localStorage`.

---

## ✨ Características Principales

- 🔔 **Recordatorio y confirmación en vivo:** Registro inmediato de tomas con hora real.
- ⏰ **Opciones de posponer:** Retrasa avisos 15 min, 30 min, 1 hora o a una hora personalizada.
- ✕ **Registro de omisión:** Permite documentar el motivo si no se toma una dosis.
- 💊 **Gestión integral de medicamentos:** Control de dosis, frecuencias, múltiples horarios y stock con alerta de reposición.
- 📊 **Seguimiento de adherencia:** Gráficos semanales, cálculo de porcentaje y días de racha.
- 🖨️ **Reporte imprimible:** Generación de resúmenes de tomas listos para llevar a la consulta médica.
- 🚨 **Acceso directo de emergencia (SOS):** Llamada rápida al 112 / 911 y números de médicos y familiares.
- 📱 **Diseño 100% responsive:** Optimizado para móviles (375px+), tablets y computadoras de escritorio.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React 18+ con TypeScript
- **Entorno de desarrollo y empaquetado:** Vite
- **Estilos y diseño:** Tailwind CSS
- **Iconografía:** Lucide React
- **Enrutamiento:** React Router DOM (v7)
- **Efectos de sonido:** Web Audio API (sintetizador armónico sin dependencias externas)
- **Efectos visuales:** Canvas Confetti

---

## 🚀 Instrucciones de Instalación y Ejecución

### Prerrequisitos
- Tener instalado **Node.js** (versión 18 o superior recomendada).
- Gestor de paquetes **npm** (incluido con Node.js).

### 1. Clonar o descargar el repositorio
```bash
git clone https://github.com/buroserviciosempresariales/Amigo_Med.git
cd Amigo_Med
```

### 2. Instalar las dependencias
```bash
npm install
```
*(En Windows PowerShell, si las políticas de ejecución restringen npm, puede ejecutarse `npm.cmd install`)*.

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```
La aplicación estará disponible en tu navegador en:
👉 `http://localhost:5173/`

### 4. Compilar para producción (Build)
```bash
npm run build
```

### 5. Previsualizar la versión de producción
```bash
npm run preview
```

---

## 📖 Manual de Usuario

### 1. Pantalla de Bienvenida
- Al ingresar por primera vez, verás la presentación de **AMIGO MED** y a **AmigoBot**.
- Conoce los 4 beneficios principales y presiona el botón grande **"Comenzar Ahora"** para acceder a tu panel.

### 2. Panel Principal (Dashboard)
Es el centro de control diario:
- **Saludo personalizado:** Te indica tu nombre, la fecha de hoy y cuántos medicamentos tienes pendientes.
- **Tarjeta de Próxima Toma:**
  - Muestra en grande el medicamento que te corresponde tomar ahora, la dosis y las instrucciones especiales.
  - **Botón `[TOMADA]` (Verde):** Presiónalo al tomar tu pastilla. Se abrirá una ventana para confirmar la hora exacta. Al confirmar, escucharás una campana suave, verás confeti y se actualizará tu historial.
  - **Botón `[POSPONER]` (Amarillo):** Si necesitas unos minutos antes de tomarla, elige posponer 15 min, 30 min, 1 hora o una hora específica.
  - **Botón `[OMITIR]` (Gris):** Si por alguna razón médica no puedes tomar la dosis, regístrala como omitida indicando el motivo.
- **Tomas del Día:** Revisa la lista completa de dosis de hoy organizadas por pestañas: *Todas, Pendientes, Tomadas u Omitidas*.
- **Resumen de Adherencia:** Muestra tu porcentaje semanal de cumplimiento y los días de racha consecutiva.

### 3. Gestión de Medicamentos (`/medicamentos`)
- **Agregar Medicamento:** Presiona el botón azul `+ Agregar Medicamento`. Completa el nombre, dosis (ej: 50 mg), frecuencia, horarios (puedes añadir varios), cantidad de pastillas disponibles en casa y color identificador.
- **Editar:** Toca el botón `Editar` en cualquier tarjeta para cambiar dosis u horarios.
- **Pausar / Activar:** Puedes pausar un medicamento temporalmente sin borrar su historial.
- **Eliminar:** Toca el ícono de la papelera y confirma si deseas remover el tratamiento.

### 4. Historial y Adherencia (`/historial`)
- Visualiza el gráfico de barras de tus tomas de los últimos 7 días.
- Filtra tus registros por período (*Hoy, 7 días, 30 días o Todo*), por medicamento específico o por estado (*Tomadas, Omitidas*).
- **Imprimir Reporte:** Presiona el botón *"Imprimir Reporte Médico"* para imprimir o guardar en PDF una hoja limpia con tu historial para tu médico de cabecera.

### 5. Contactos Importantes y Emergencia (`/contacto`)
- **Botón SOS (Emergencias):** Enlace directo para llamar al 112 / 911 ante cualquier urgencia de salud.
- **Directorio Telefónico:** Tarjetas organizadas con números de tu médico especialista, familiares de emergencia y cuidadores, con botones grandes de *"Llamar"* que marcan directamente desde el teléfono.

### 6. Perfil y Ajustes de Accesibilidad (`/perfil`)
- **Tamaño de texto:** Elige entre **A (Normal)**, **A+ (Grande)** y **A++ (Extra Grande)** para que toda la aplicación se adapte a tu vista.
- **Alto contraste:** Activa bordes y tipografías ultra-definidas.
- **Sonidos:** Activa o desactiva las campanillas acústicas de confirmación.
- **Datos de salud de referencia:** Ingresa tus alergias conocidas, tipo de sangre y condiciones para tenerlas siempre a la vista.

### 7. Centro de Ayuda y Simulador (`/ayuda`)
- **Guías paso a paso:** Tutoriales interactivos guiados por AmigoBot para aprender a usar cada función.
- **Simulador de Alarma en Vivo:** Permite probar cómo suena un recordatorio y practicar cómo confirmar, posponer u omitir sin alterar tus datos reales.
- **Preguntas frecuentes:** Respuestas claras a dudas comunes sobre el uso del sistema.

---

## ⚠️ Aviso de Responsabilidad Médica

**AMIGO MED es una herramienta digital de apoyo y asistencia personal.**
No emite diagnósticos médicos, no prescribe tratamientos ni sustituye el criterio, consulta o atención de profesionales de la salud debidamente certificados. Consulte siempre a su médico antes de realizar cualquier modificación en sus dosis o medicamentos.

---

<div align="center">

<sub>Elaborado por Buró de Servicios Empresariales -2026 -+593999597697</sub>

</div>
