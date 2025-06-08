// Animated Coding Background
class CodeBackground {
    constructor() {
        this.codeSnippets = [
            'const app = express();',
            'function calculate(x, y) { return x + y; }',
            'import React from "react";',
            '<div className="container">',
            'async function fetchData() {',
            'if (isValid) { process(); }',
            'const [state, setState] = useState();',
            'app.listen(3000);',
            'export default Component;',
            'npm install --save',
            'git commit -m "Update"',
            'docker run -p 8080:80',
            'SELECT * FROM users WHERE id = ?',
            'console.log("Hello World");',
            'let result = await fetch(url);',
            'class MyComponent extends React.Component {',
            'const router = new Router();',
            'db.collection("users").find({})',
            'transform: translateY(-50%);',
            'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);',
            'box-shadow: 0 10px 20px rgba(0,0,0,0.2);',
            '@media (max-width: 768px) {',
            'useState(() => { loadData(); }, []);',
            'const handleSubmit = (e) => {',
            'return response.json();',
            'interface User { name: string; }',
            'type Props = { children: ReactNode };',
            '#include <iostream>',
            'def main():',
            'public static void main(String[] args) {',
            '<?php echo "Hello"; ?>',
            'body { margin: 0; padding: 0; }',
            '.container { max-width: 1200px; }',
            'flex-direction: column;',
            'justify-content: center;',
            'align-items: center;',
            'position: absolute;',
            'z-index: 999;',
            'transition: all 0.3s ease;',
            'npm run build',
            'yarn add react-router-dom',
            'kubectl apply -f deployment.yaml',
            'FROM node:14-alpine',
            'WORKDIR /app',
            'COPY package*.json ./',
            'RUN npm ci --only=production',
            'EXPOSE 3000',
            'CMD ["node", "server.js"]'
        ];
        
        this.loaded = false; // flag to indicate first line rendered
        
        this.init();
    }

    init() {
        this.createBackground();
        this.generateCodeLines();
        
        // Pause/resume background animation on page visibility change
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
        
        // Regenerate lines periodically
        setInterval(() => {
            this.generateCodeLines();
        }, 10000);
    }

    createBackground() {
        const background = document.createElement('div');
        background.className = 'code-background';
        document.body.appendChild(background);
        this.background = background;
    }

    generateCodeLines() {
        const lineCount = Math.floor(window.innerHeight / 50); // One line every 50px
        
        for (let i = 0; i < lineCount; i++) {
            setTimeout(() => {
                this.createCodeLine(i);
            }, i * 200); // Stagger creation
        }
    }

    createCodeLine(index) {
        const line = document.createElement('div');
        line.className = 'code-line';
        
        // Randomize animation direction: left-to-right or right-to-left
        if (Math.random() < 0.5) {
            line.style.animationName = 'float-code-alt';
        } // else default to 'float-code'
        
        if (!this.loaded) {
            document.body.classList.remove('loading');
            this.loaded = true;
        }
        
        // Random code snippet
        const snippet = this.codeSnippets[Math.floor(Math.random() * this.codeSnippets.length)];
        line.textContent = snippet;
        
        // Random vertical position
        line.style.top = `${Math.random() * window.innerHeight}px`;
        
        // Random speed (duration)
        const duration = 15 + Math.random() * 25; // 15-40 seconds
        line.style.animationDuration = `${duration}s`;
        
        // Random delay
        line.style.animationDelay = `${Math.random() * 5}s`;
        
        // Random opacity
        line.style.opacity = 0.3 + Math.random() * 0.7;
        
        this.background.appendChild(line);
        
        // Remove element after animation completes
        setTimeout(() => {
            line.remove();
        }, (duration + 5) * 1000);
    }

    // Pause animations when page is not visible
    handleVisibilityChange() {
        if (document.hidden) {
            this.background.style.animationPlayState = 'paused';
        } else {
            this.background.style.animationPlayState = 'running';
        }
    }
}

// Initialize CodeBackground when DOM is ready (or immediately if already loaded)
function initCodeBackground() {
    new CodeBackground();
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCodeBackground);
} else {
    initCodeBackground();
} 