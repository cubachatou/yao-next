# Adding New Work Images

This guide explains how to add new images to your works without manually renaming files or writing import statements.

## Quick Start

1. **Add your images** to the appropriate work folder in `public/works/work-X/`
   - You can name them anything you want (e.g., `photo1.jpg`, `IMG_001.jpg`, `my-awesome-photo.png`)
   - Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`

2. **Run the generator script**:

   ```bash
   npm run generate:works
   ```

3. **Done!** The script will automatically:
   - Scan all work folders
   - Sort images alphabetically (with natural number sorting)
   - Generate all import statements
   - Update `app/works/data.ts`

## Examples

### Adding images to an existing work

```bash
# Add new images to work-2
public/works/work-2/
  ├── beach-sunset.jpg
  ├── mountain-view.jpg
  └── city-lights.png

# Run the generator
npm run generate:works
```

The images will be automatically sorted alphabetically:

- `beach-sunset.jpg` → First image
- `city-lights.png` → Second image
- `mountain-view.jpg` → Third image

### Creating a new work folder

```bash
# Create a new work folder
mkdir public/works/work-11

# Add your images
public/works/work-11/
  ├── photo1.jpg
  ├── photo2.jpg
  └── photo3.jpg

# Run the generator
npm run generate:works
```

## How It Works

The `scripts/generate-work-imports.js` script:

1. Scans the `public/works/` directory
2. Finds all folders matching `work-X` pattern
3. For each folder, finds all image files
4. Sorts images alphabetically (using natural sort: `1.jpg`, `2.jpg`, `10.jpg`)
5. Generates TypeScript import statements
6. Creates the `worksData` array with all images
7. Writes everything to `app/works/data.ts`

## Tips

- **No need to rename files** - The script handles any filename
- **Alphabetical order** - Images are sorted alphabetically, so you can control order with filenames:
  - Use numbers: `01-hero.jpg`, `02-detail.jpg`
  - Use letters: `a-main.jpg`, `b-secondary.jpg`
  - Or just use: `1.jpg`, `2.jpg`, `3.jpg` (simplest)
- **Run after any changes** - Always run `npm run generate:works` after adding/removing/renaming images

## Troubleshooting

**Images not showing up?**

- Make sure you ran `npm run generate:works`
- Check that images are in the correct folder: `public/works/work-X/`
- Verify the file extension is supported (`.jpg`, `.jpeg`, `.png`, `.webp`)

**Wrong order?**

- Images are sorted alphabetically
- Use numbered prefixes to control order: `01-`, `02-`, etc.
