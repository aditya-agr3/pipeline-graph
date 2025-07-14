# Pipeline Editor - Visual DAG Builder

A sophisticated visual pipeline editor for creating and managing Directed Acyclic Graphs (DAGs) with real-time validation, auto-layout, and interactive node management.

##  Live Demo

**Deployed Site**: [Live Demo Link](https://your-deployed-url.com)

##  Screenshot

<img width="1312" height="817" alt="image" src="https://github.com/user-attachments/assets/63f71c40-0b36-4827-b889-324464c546bc" />


##  Demo Video

[Screen Recording Link](https://your-video-link.com) - Complete walkthrough of all features

##  Features

- **Visual Node Editor**: Drag-and-drop interface for creating pipeline nodes
- **Real-time DAG Validation**: Prevents cycles and invalid connections
- **Auto Layout**: Intelligent graph arrangement using Dagre algorithm
- **Interactive Canvas**: Pan, zoom, and minimap for large pipelines
- **Keyboard Shortcuts**: Quick actions (Delete, Add Node, Auto Layout)
- **JSON Export**: Real-time pipeline structure preview
- **Responsive Design**: Works on desktop and tablet devices

##  Technologies Used

### Core Framework
- **React 18.3.1** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - High-quality component library
- **Lucide React** - Modern icon library

### Graph & Visualization
- **@xyflow/react (React Flow) 12.8.2** - Powerful graph visualization
- **Dagre 0.8.5** - Graph layout algorithm
- **React Flow Background/Controls/MiniMap** - Enhanced graph interaction

### State Management & Utilities
- **React Hooks** - useState, useCallback, useEffect for state management
- **Custom Hooks** - useKeyboardShortcuts for keyboard interactions
- **Class Variance Authority** - Component variant management

##  Architecture Overview

```
src/
├── components/
│   ├── PipelineEditor.tsx      # Main editor component
│   ├── PipelineToolbar.tsx     # Toolbar with actions
│   ├── ValidationPanel.tsx     # DAG validation display
│   ├── JsonPreview.tsx         # Pipeline JSON viewer
│   └── nodes/
│       └── PipelineNode.tsx    # Custom node component
├── utils/
│   ├── dagValidation.ts        # Graph validation logic
│   └── autoLayout.ts           # Auto-layout algorithms
├── hooks/
│   └── useKeyboardShortcuts.ts # Keyboard event handling
└── pages/
    └── Index.tsx               # Main application page
```

##  Technical Decisions

### Why React Flow?
- **Mature Library**: Battle-tested for graph visualization
- **Extensive Features**: Built-in pan/zoom, minimap, controls
- **Customizable**: Easy to create custom nodes and edges
- **Performance**: Handles large graphs efficiently

### Why Dagre for Auto-Layout?
- **Industry Standard**: Widely used graph layout algorithm
- **Hierarchical Layout**: Perfect for DAG structures
- **Customizable**: Configurable spacing and direction

### Why TypeScript?
- **Type Safety**: Prevents runtime errors
- **Better DX**: Excellent IDE support and IntelliSense
- **Maintainability**: Easier refactoring and debugging

### State Management Approach
- **React Hooks**: Simple and effective for this use case
- **React Flow Hooks**: Leverages built-in state management
- **Local State**: No need for complex global state management

##  Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:8080`

### Build for Production
```bash
npm run build
npm run preview  # Preview production build
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

##  How to Use

1. **Add Nodes**: Click "Add Node" button and enter a name
2. **Connect Nodes**: Drag from one node's handle to another
3. **Auto Layout**: Click "Auto Layout" to organize nodes
4. **View JSON**: Toggle "Show JSON" to see pipeline structure
5. **Validation**: Check validation panel for errors
6. **Keyboard Shortcuts**:
   - `Delete`: Remove selected nodes/edges
   - `Ctrl/Cmd + A`: Add new node
   - `Ctrl/Cmd + L`: Auto layout

##  Key Components Explained

### PipelineEditor.tsx
- Main orchestrator component
- Manages nodes and edges state
- Handles all user interactions
- Integrates validation and layout

### PipelineNode.tsx
- Custom React Flow node
- Handles node rendering and styling
- Manages connection handles

### dagValidation.ts
- Implements cycle detection using DFS
- Validates DAG properties
- Returns detailed error messages

### autoLayout.ts
- Uses Dagre algorithm for positioning
- Calculates optimal node placement
- Maintains proper spacing

##  Challenges Faced & Solutions

### 1. Cycle Detection in Real-time
**Challenge**: Implementing efficient cycle detection for large graphs
**Solution**: Used Depth-First Search (DFS) with color-coding algorithm
**Learning**: Graph algorithms are crucial for DAG validation

### 2. Node Positioning & Auto Layout
**Challenge**: Manually positioned nodes looked messy
**Solution**: Integrated Dagre algorithm for hierarchical layout
**Learning**: Leveraging existing algorithms saves development time

### 3. React Flow Integration
**Challenge**: Custom node styling and event handling
**Solution**: Created custom node components with proper TypeScript typing
**Learning**: Understanding library APIs deeply improves implementation

### 4. State Management Complexity
**Challenge**: Managing nodes, edges, and validation state
**Solution**: Used React Flow's built-in hooks with custom validation layer
**Learning**: Sometimes built-in solutions are better than custom ones

### 5. Keyboard Shortcuts Implementation
**Challenge**: Global keyboard events conflicting with inputs
**Solution**: Created custom hook with proper event filtering
**Learning**: Event propagation and preventDefault are important

### 6. Real-time Validation UI
**Challenge**: Showing validation errors without blocking user
**Solution**: Separate validation panel with clear error messages
**Learning**: User experience should guide technical implementation

##  References & Resources

### Documentation
- [React Flow Documentation](https://reactflow.dev/)
- [Dagre Algorithm](https://github.com/dagrejs/dagre)
- [Shadcn/UI Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

### Algorithms & Concepts
- [Depth-First Search for Cycle Detection](https://en.wikipedia.org/wiki/Topological_sorting)
- [Directed Acyclic Graph (DAG)](https://en.wikipedia.org/wiki/Directed_acyclic_graph)
- [Graph Layout Algorithms](https://en.wikipedia.org/wiki/Graph_drawing)

### React & TypeScript
- [React Hooks Documentation](https://react.dev/reference/react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Flow Custom Nodes](https://reactflow.dev/learn/customization/custom-nodes)

### Tools & Libraries
- [Vite Build Tool](https://vitejs.dev/)
- [Lucide React Icons](https://lucide.dev/)
- [Class Variance Authority](https://cva.style/docs)

##  Interview Talking Points

### Technical Skills Demonstrated
- **React Ecosystem**: Hooks, TypeScript, modern patterns
- **Graph Algorithms**: DFS, cycle detection, topological concepts
- **UI/UX Design**: Responsive design, keyboard shortcuts, tooltips
- **State Management**: Complex state with validation layer
- **Code Architecture**: Component composition, custom hooks
- **Problem Solving**: Real-time validation, auto-layout implementation

### Key Achievements
- Built production-ready visual editor
- Implemented complex graph algorithms
- Created intuitive user interface
- Handled edge cases and validation
- Optimized for performance and usability

---


## How can I edit this code?

There are several ways of editing your application.


**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. 

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
