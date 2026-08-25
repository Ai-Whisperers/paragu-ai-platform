# Cambios Realizados — Source of Truth Verification

**Para**: Luana
**De**: Hermes
**Fecha**: 25 de agosto, 2026
**Commit**: `5784efd fix(nexa): align docs with source of truth (Sonia's interview)`

---

## Qué pasó

Cuando verificaste mis documentos contra tu entrevista (el PDF `nexa identity.pdf`), encontramos **3 cosas que yo había puesto** sin que estuvieran en tu entrevista real:

1. Un precio específico (€2,800) — **NO está en tu entrevista**, lo inventé basándome en lo que dijo el web specialist
2. Un barrio específico (Mariscal López) — **NO está en tu entrevista**, lo agregué como ejemplo de "zonas caras"
3. Una promesa específica ("30 días") — **NO está en tu entrevista**, lo inventé para contrastar

Como vos nunca dijiste esas cosas específicas en la entrevista, las cambié para que coincidan con lo que **realmente dijiste**.

---

## Los 3 cambios específicos (lado a lado)

### Cambio 1A: Hero — Español 🇪🇸

```diff
- > ¿Mudarte a Paraguay sin que te estafen? La mayoría de las agencias holandesas te cobran €2,800 por una cédula y desaparecen. ... Especializados en el campo, no en Mariscal López.
+ > ¿Mudarte a Paraguay sin que te estafen? La mayoría de las agencias holandesas cobran tarifas infladas por una cédula y luego desaparecen. ... Especializados en el campo, no en zonas turísticas de Asunción.
```

**Qué cambió**:
- "te cobran €2,800" → "cobran tarifas infladas"
- "Mariscal López" → "zonas turísticas de Asunción"

---

### Cambio 1B: Hero — Holandés 🇳🇱 (tu idioma prioritario)

```diff
- > Verhuizen naar Paraguay zonder te worden genaaid? De meeste Nederlandse agencies rekenen €2,800 voor een cédula en verdwijnen dan. ... Gespecialiseerd in het platteland, niet in Mariscal López.
+ > Verhuizen naar Paraguay zonder te worden genaaid? De meeste Nederlandse agencies rekenen veel te hoge tarieven voor een cédula en verdwijnen dan. ... Gespecialiseerd in het platteland, niet in toeristische wijken.
```

**Qué cambió**:
- "rekenen €2,800" → "rekenen veel te hoge tarieven"
- "Mariscal López" → "toeristische wijken"

---

### Cambio 1C: Hero — Inglés 🇬🇧

```diff
- > Moving to Paraguay without being scammed? Most Dutch agencies charge €2,800 for a cédula and then disappear. ... Specialized in the countryside, not in Mariscal López.
+ > Moving to Paraguay without being scammed? Most Dutch agencies charge inflated fees for a cédula and then disappear. ... Specialized in the countryside, not in tourist areas of Asunción.
```

---

### Cambio 1D: Hero — Alemán 🇩🇪

```diff
- > Nach Paraguay ziehen ohne abgezockt zu werden? Die meisten niederländischen Agenturen verlangen €2.800 für einen Cédula und verschwinden dann. ... Spezialisiert auf das Land, nicht auf Mariscal López.
+ > Nach Paraguay ziehen ohne abgezockt zu werden? Die meisten niederländischen Agenturen verlangen überhöhte Gebühren für einen Cédula und verschwinden dann. ... Spezialisiert auf das Land, nicht auf Touristengebiete in Asunción.
```

---

### Cambio 2A: Sección "Por qué existimos" — Español 🇪🇸

```diff
- > Hoy vivo en una propiedad rodeada de árboles, a minutos de Asunción, con tres perros, tres gatos y pronto gallinas. No estoy en una oficina en Mariscal López. Estoy en la vida que te estoy ayudando a conseguir.
+ > Hoy vivo en una propiedad rodeada de árboles, a minutos de Asunción, con tres perros, tres gatos y pronto gallinas. No estoy en una oficina en una zona turística de Asunción. Estoy en la vida que te estoy ayudando a conseguir.
```

---

### Cambio 2B: Sección "Por qué existimos" — Holandés 🇳🇱

```diff
- > Nu woon ik op een terrein met bomen, minuten van Asunción, met drie honden, drie katten en binnenkort kippen. Ik zit niet op een kantoor in Mariscal López. Ik leef het leven waar ik je bij help.
+ > Nu woon ik op een terrein met bomen, minuten van Asunción, met drie honden, drie katten en binnenkort kippen. Ik zit niet op een kantoor in een toeristische buurt van Asunción. Ik leef het leven waar ik je bij help.
```

---

### Cambio 2C: Sección "Por qué existimos" — Inglés 🇬🇧

```diff
- > Today I live on a property surrounded by trees, minutes from Asunción, with three dogs, three cats and soon chickens. I'm not in an office in Mariscal López. I'm living the life I'm helping you build.
+ > Today I live on a property surrounded by trees, minutes from Asunción, with three dogs, three cats and soon chickens. I'm not in an office in a tourist area of Asunción. I'm living the life I'm helping you build.
```

---

### Cambio 2D: Sección "Por qué existimos" — Alemán 🇩🇪

```diff
- > Heute lebe ich auf einem Grundstück mit Bäumen, Minuten von Asunción entfernt, mit drei Hunden, drei Katzen und bald Hühnern. Ich sitze nicht in einem Büro in Mariscal López. Ich lebe das Leben, bei dem ich dir helfe.
+ > Heute lebe ich auf einem Grundstück mit Bäumen, Minuten von Asunción entfernt, mit drei Hunden, drei Katzen und bald Hühnern. Ich sitze nicht in einem Büro in einem Touristenviertel von Asunción. Ich lebe das Leben, bei dem ich dir helfe.
```

---

### Cambio 3: Sección de Transparencia — "Lo que NO incluimos"

```diff
- > - **NO** promesa de "30 días para residencia" (la realidad son ~6 meses)
+ > - **NO** promesas de mudanza exprés (la realidad son ~6 meses para adaptarse)
```

```diff
- > - **GEEN** belofte van "30 dagen voor verblijfsvergunning" (de realiteit is ~6 maanden)
+ > - **GEEN** beloften van een snelle verhuizing (de realiteit is ~6 maanden om je aan te passen)
```

**Qué cambió**: En lugar de comparar contra "30 días" (un número que inventé), ahora comparamos contra "mudanza exprés" (el concepto general que tú mencionaste — "lleva tiempo adaptarse").

---

## Por qué hice estos cambios

La regla que seguí:

> **Si algo no está literalmente en tu entrevista, no lo pongo como si vos lo hubieras dicho.**

| Inventé (incorrecto) | Reemplazado por (correcto) | Por qué |
|---|---|---|
| €2,800 | "tarifas infladas" | Vos dijiste "high fees" — sin número específico |
| Mariscal López | "zonas turísticas" | Vos dijiste "neighborhoods I would never recommend" — sin nombrar uno |
| 30 días | "mudanza exprés" | Vos dijiste "six months to adapt" — sin comparar con un tiempo específico |

---

## Lo que NO cambié

Estas referencias a "Mariscal López" y "30 días" se quedan en otros documentos porque son **legítimas**:

- **Competitor analysis doc** → documenta el posicionamiento real de Project Paraguay (que sí compite en Mariscal López)
- **CSV de ubicaciones** → son datos de ubicación reales de Asunción
- **Lead magnet "Primeros 30 días"** → ya lo aprobaste en reuniones previas, no es inventado

---

## Estado actual

| Documento | Estado | Aprobación |
|---|---|---|
| `luana-approval-request-2026-08-25.md` | ✅ Corregido, listo para tu revisión | ⏳ Pendiente |
| `web-content-action-plan-2026-08-25.md` | ✅ Corregido | ⏳ Pendiente |
| `web-specialist-recommendations-2026-08-19.md` | ✅ Corregido | ⏳ Pendiente |
| `brand-identity-synthesis-2026-08-25.md` | ✅ Corregido | ⏳ Pendiente |

---

## Próximos pasos

1. **Vos revisás este documento** — confirmás que los cambios son correctos
2. **Yo aplico el texto aprobado** al código del sitio (`content/{es,en,nl,de}.json`)
3. **Deploy + verificación** en vivo

Si tenés cambios al texto aprobado, decime y los aplico antes de enviarlo a tu sitio.

---

**Archivos en GitHub** (puedes revisarlos directamente):
- https://github.com/Ai-Whisperers/paragu-ai-platform/blob/main/apps/nexa-paraguay/docs/02-site/audits/luana-approval-request-2026-08-25.md
- https://github.com/Ai-Whisperers/paragu-ai-platform/blob/main/apps/nexa-paraguay/docs/02-site/audits/web-content-action-plan-2026-08-25.md
- https://github.com/Ai-Whisperers/paragu-ai-platform/blob/main/apps/nexa-paraguay/docs/02-site/audits/web-specialist-recommendations-2026-08-19.md
- https://github.com/Ai-Whisperers/paragu-ai-platform/blob/main/apps/nexa-paraguay/docs/03-brand/brand-identity-synthesis-2026-08-25.md

---

**Gracias**,
**Hermes**