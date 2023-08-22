import { CATEGORIES } from './categories'

interface Category {
  category: CATEGORIES
  slug: string
  words: string[]
}

export const SEARCH_WORDS: Category[] = [
  {
    category: CATEGORIES.Alimentación,
    slug: 'alimentacion',
    words: [
      'croquetas',
      'alimentos',
      'croquetas',
      'comidas',
      'alimentos',
      'alimentacion canina',
      'dieta',
      'nutricion',
      'recetas',
      'barf',
      'comida natural',
      'suplementos',
      'nutrientes',
      'raciones diarias',
      'vitaminas',
      'minerales',
      'proteinas',
      'snacks',
      'premios',
      'comida humeda',
      'preparacion de alimentos',
      'control de peso',
    ],
  },
  {
    category: CATEGORIES.Entrenamiento,
    slug: 'entrenamiento',
    words: [
      'entrenar',
      'clases',
      'adiestramiento',
      'instruccion',
      'educacion',
      'entrenador',
      'trainer',
      'comandos',
      'obediencia',
      'refuerzo positivo',
      'disciplina',
      'sesiones',
      'socializacion',
      'aprendizaje',
      'habilidades',
      'conducta',
      'comportamiento',
    ],
  },
  {
    category: CATEGORIES.Hospedaje,
    slug: 'hospedaje',
    words: [
      'hotel',
      'cuidado',
      'pension',
      'guarderia',
      'residencia',
      'alojamiento',
      'estadia',
      'refugio',
      'estancia',
      'centro de hospedaje',
      'hogar temporal',
    ],
  },
]
