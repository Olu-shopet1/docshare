# DocShare - Document Sharing Platform

A modern, full-featured document sharing platform built with React, TypeScript, and Tailwind CSS. Similar to Linktree but focused on sharing documents and resources.

## Features

- 📄 **Profile Page**: Beautiful profile display with shared documents
- 📊 **Dashboard**: Manage documents, view statistics, and upload new items
- 🖼️ **Gallery**: Browse all documents in a visual gallery format
- 🎨 **Page Builder**: Customize your profile page layout with drag-and-drop sections
- 🔗 **Document Management**: Add, edit, delete, and toggle visibility of documents
- 📊 **Analytics**: Track views and engagement metrics
- 🎯 **Multiple Document Types**: Support for PDF, links, images, videos, Figma, Notion, and more

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui + Radix UI
- **Routing**: React Router v6
- **Icons**: Lucide React
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repo-url>
cd linktree-project
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── Layout.tsx       # Main layout wrapper
│   ├── ProfileHeader.tsx
│   ├── DocumentCard.tsx
│   └── DocumentUpload.tsx
├── pages/
│   ├── ProfilePage.tsx  # Public profile view
│   ├── Dashboard.tsx    # Document management
│   ├── Gallery.tsx      # Document gallery
│   └── PageBuilder.tsx  # Layout customization
├── context/
│   └── DocumentContext.tsx  # Global state management
├── lib/
│   ├── mockData.ts      # Sample data
│   └── utils.ts         # Utility functions
├── App.tsx
├── main.tsx
└── index.css
```

## Pages

### Profile Page
The main public-facing page where users can showcase their shared documents with a professional profile header and document grid.

### Dashboard
Administrative interface for managing documents:
- Upload new documents
- Edit document details
- Toggle document visibility (active/hidden)
- View engagement statistics
- Delete documents

### Gallery
Visual browse of all documents with:
- Thumbnail previews
- Document type badges
- View counts and upload dates
- Quick preview modal

### Page Builder
Customize profile page layout:
- Toggle sections on/off (Hero, Documents, About, Contact)
- Customize colors (Primary, Secondary, Background)
- Live preview mode
- Drag-to-reorder sections

## Document Types Supported

- 📕 PDF
- 🔗 Links
- 🖼️ Images
- 🎥 Videos
- 🎨 Figma
- 📝 Notion
- 📄 Documents

## Color Scheme

The application uses a modern light/dark theme with:
- Light mode: Clean whites and light grays
- Dark mode: Deep blacks with contrasting text
- Gradient accents using purple and pink

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For support, email support@docshare.com or open an issue in the repository.
