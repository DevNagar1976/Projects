# Airbnb Frontend Clone

Responsive Airbnb-inspired frontend built with React, Vite, and JavaScript.

## Run

```bash
npm install
npm run dev
```

## Fix a blank page after replacing an older version

Close the dev server and run:

### Windows PowerShell

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm install
npm run dev
```

### Command Prompt

```bat
rmdir /s /q node_modules
del package-lock.json
npm install
npm run dev
```

The project uses internal SVG icons, so no icon-library dependency is required.
