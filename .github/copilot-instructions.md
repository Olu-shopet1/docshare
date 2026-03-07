# DocShare Project Development Guide

## Project Overview
DocShare is a modern document sharing platform similar to Linktree, built with React TypeScript and Tailwind CSS. It provides users with a platform to share documents and resources with a beautiful profile page, dashboard, gallery view, and customizable page builder.

## Technology Stack
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **UI Library**: shadcn/ui + Radix UI
- **Routing**: React Router v6
- **Icons**: Lucide React
- **State Management**: React Context API

## Key Features
1. Profile page with document showcase
2. Dashboard for document management
3. Gallery view with previews
4. Page builder with customization options
5. Document upload and management
6. Analytics and engagement tracking

## Development Guidelines

### File Structure
- `/src/components/` - Reusable UI components and custom components
- `/src/pages/` - Page components for different routes
- `/src/context/` - React Context for state management
- `/src/lib/` - Utilities and mock data
- `/src/index.css` - Tailwind CSS configuration

### Component Standards
- Use TypeScript for type safety
- Create reusable components in UI folder
- Follow shadcn/ui component patterns
- Use Tailwind CSS for styling
- Implement proper error handling

### State Management
- Use React Context API for global state
- Keep context focused on specific domains
- Use custom hooks for context consumption

### Styling
- Use Tailwind CSS utility classes
- Follow the design system (colors, spacing, typography)
- Implement responsive design with TW breakpoints
- Support light and dark modes

## Common Tasks

### Adding New Pages
1. Create new file in `/src/pages/`
2. Add route in `App.tsx`
3. Update navigation in `Layout.tsx` if needed

### Creating Components
1. Create component in appropriate folder
2. Export with proper TypeScript types
3. Use Tailwind CSS for styling
4. Add to relevant story/documentation

### Managing Documents
Documents are managed via DocumentContext with methods:
- `addDocument()` - Add new document
- `updateDocument()` - Modify existing document
- `deleteDocument()` - Remove document
- `toggleDocumentActive()` - Hide/show document

## Running the Application

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
```

## Troubleshooting

### Dependencies Issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear npm cache: `npm cache clean --force`

### Styling Issues
- Ensure Tailwind CSS is properly imported in `index.css`
- Check that component class names are built correctly

### Route Issues
- Verify routes are registered in `App.tsx`
- Check navigation links point to correct paths

## Best Practices
- Always use TypeScript types
- Keep components small and focused
- Use custom hooks for reusable logic
- Follow React conventions
- Implement proper error boundaries
- Test components before deploying

## Additional Resources
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com/en/main)
