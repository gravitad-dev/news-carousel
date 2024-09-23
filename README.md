# Proyecto Carousel

## Funcionalidad General

El proyecto permite la visualización de diferentes campañas publicitarias mediante un carrusel de imágenes. Los usuarios pueden interactuar con un menú desplegable (select) que les permite elegir entre varias campañas publicitarias. Al seleccionar una campaña, se cargan páginas específicas que muestran contenido externo de sitios como CNN, El País y Reuters a través de iframes. Esto proporciona a los usuarios información relevante mientras se presentan banners publicitarios relacionados.

### Rutas principales:

- **/cnn**: Carga la página de CNN.
- **/cnn-testing**: Carga la versión de testing de CNN.
- **/pais**: Carga la página de El País.
- **/pais-testing**: Carga la versión de testing de El País.
- **/reuters**: Abre la página de Reuters en una nueva pestaña.
- **/reuters-testing**: Abre la versión de testing de Reuters en una nueva pestaña.

---

## Páginas específicas de campañas

### Páginas de El País

#### PaisPage.jsx

Carga la página de El País dentro de un iframe utilizando el componente Frame. La URL correspondiente es [https://el-pais2.vercel.app/](https://el-pais2.vercel.app/).

```jsx
import Frame from '../components/Frame';

export function PaisPage() {
  return <Frame src="https://el-pais2.vercel.app/" />;
}
```

#### PaisPageTesting.jsx

Utiliza una URL diferente para la versión de testing de la página de El País: [https://el-pais-three.vercel.app/](https://el-pais-three.vercel.app/).

```jsx
import Frame from '../components/Frame';

export function PaisPageTesting() {
  return <Frame src="https://el-pais-three.vercel.app/" />;
}
```

### Páginas de CNN

#### CnnPage.jsx

Carga la página de CNN usando un iframe dentro del componente Frame. La URL usada para la versión estándar de CNN es: [https://cnn-2.vercel.app/](https://cnn-2.vercel.app/).

```jsx
import Frame from '../components/Frame';

export function CnnPage() {
  return <Frame src="https://cnn-2.vercel.app/" />;
}
```

#### CnnPageTesting.jsx

Similar a CnnPage, pero usa una URL diferente para propósitos de testing: [https://cnn-three.vercel.app/](https://cnn-three.vercel.app/).

```jsx
import Frame from '../components/Frame';

export function CnnPageTesting() {
  return <Frame src="https://cnn-three.vercel.app/" />;
}
```

### Páginas de Reuters

#### ReuterPage.jsx

A diferencia de las demás páginas, esta abre la URL de Reuters en una nueva pestaña usando window.open. La URL utilizada es: [https://reuters2.vercel.app/](https://reuters2.vercel.app/).

```jsx
import { useEffect } from 'react';

export const ReuterPage = () => {
  const iframeSrc = 'https://reuters2.vercel.app/';

  useEffect(() => {
    window.open(iframeSrc, '_blank');
  }, []);

  return null;
};
```

#### ReuterPageTesting.jsx

Similar a ReuterPage, pero con una URL de testing: [https://reuters-sg6p.vercel.app/](https://reuters-sg6p.vercel.app/).

```jsx
import { useEffect } from 'react';

export const ReuterPageTesting = () => {
  const iframeSrc = 'https://reuters-sg6p.vercel.app/';

  useEffect(() => {
    window.open(iframeSrc, '_blank');
  }, []);

  return null;
};
```

### Descripción del componente Frame

El componente Frame encapsula un iframe, permitiendo que las URLs se inyecten dinámicamente en la aplicación de una manera segura y controlada. Aquí se cargan las URLs de las diferentes campañas publicitarias, incluyendo las versiones de testing.

Ejemplo del componente Frame:

```jsx
import React from 'react';

function Frame({ src }) {
  return (
    <iframe
      src={src}
      title="Ad frame"
      width="100%"
      height="100%"
      frameBorder="0"
      allowFullScreen
    />
  );
}

export default Frame;
```
