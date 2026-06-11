# Cómo agregar imágenes reales a las Premades

## El problema
Las 6 premades del sitio actualmente usan las mismas imágenes del portafolio. Esto confunde a los clientes y daña la credibilidad.

## Qué necesitás hacer

### 1. Crear 6 imágenes únicas para premades
Cada premade necesita su propia imagen de portada (no usar las del portafolio). Idealmente:
- **Formato:** JPG o PNG, 1200×1800px mínimo
- **Estilo:** Que se vea como una portada real pero que NO sea un libro existente
- **Cada una debe ser DISTINTA** — no usar la misma imagen para dos premades con diferente nombre

### 2. Nombrar los archivos
Usá nombres cortos sin espacios ni caracteres especiales:

| Premade | Nombre de archivo sugerido |
|---------|---------------------------|
| Alas de Cristal | `premade-alas-cristal.jpg` |
| Corazón de Cenizas | `premade-corazon-cenizas.jpg` |
| Susurros del Bosque | `premade-susurros-bosque.jpg` |
| Sombras en el Espejo | `premade-sombras-espejo.jpg` |
| Galaxia Interior | `premade-galaxia-interior.jpg` |
| El Último Código | `premade-ultimo-codigo.jpg` |

### 3. Copiar a la carpeta correcta
Poner los archivos en:
```
public/dayah/
```

### 4. Actualizar el archivo de contenido
Editar `content/es.json` en la sección `premades.items` y cambiar el campo `image` de cada premade para que apunte al archivo nuevo:

```json
"image": "/dayah/premade-alas-cristal.jpg"
```

### 5. ¡Listo!
El sitio usará automáticamente las imágenes nuevas. No hace falta rebuild — el equipo despliega los cambios.
