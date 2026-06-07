
-- Gallery images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  src TEXT NOT NULL,
  alt TEXT NOT NULL,
  tag TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for querying by tag
CREATE INDEX IF NOT EXISTS idx_gallery_images_tag ON gallery_images(tag);

-- Index for display order
CREATE INDEX IF NOT EXISTS idx_gallery_images_order ON gallery_images(display_order);

-- Enable RLS
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON gallery_images
  FOR SELECT TO public
  USING (true);

-- Insert sample data
INSERT INTO gallery_images (src, alt, tag, display_order) VALUES
  ('/images/gallery/balayage-1.jpg', 'Balayage experto', 'color', 1),
  ('/images/gallery/corte-bob.jpg', 'Corte moderno', 'corte', 2),
  ('/images/gallery/keratina.jpg', 'Tratamiento capilar', 'tratamiento', 3),
  ('/images/gallery/rubio-platinado.jpg', 'Coloración profesional', 'color', 4),
  ('/images/gallery/mechas-naturales.jpg', 'Mechas naturales', 'color', 5),
  ('/images/gallery/peinado-novia.jpg', 'Estilizado elegante', 'estilizado', 6),
  ('/images/gallery/color-bronce.jpg', 'Trabajo de Tinte', 'color', 7),
  ('/images/gallery/corte-masculino.jpg', 'Corte caballero', 'corte', 8),
  ('/images/gallery/ombre.jpg', 'Ombre natural', 'color', 9)
ON CONFLICT DO NOTHING;
