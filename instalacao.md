📋 Passos para Adicionar o Vite ao Projeto Existente
1. Inicialize o npm no projeto atual
bash
# Na pasta raiz do seu projeto A-Frame
npm init -y
2. Instale o Vite como dependência de desenvolvimento
bash
npm install --save-dev vite
3. Instale dependências adicionais necessárias
bash
npm install --save-dev @vitejs/plugin-basic-ssl
4. Crie o arquivo vite.config.js
Crie um arquivo vite.config.js na raiz do projeto:

javascript
import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [
    basicSsl()
  ],
  server: {
    port: 3000,
    https: true, // Necessário para WebXR
    host: true
  },
  build: {
    target: 'es2020'
  }
});
5. Atualize o package.json
Adicione os scripts no seu package.json:

json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
6. Estruture seus arquivos corretamente
Certifique-se de que sua estrutura de arquivos esteja organizada:

text
seu-projeto/
├── index.html
├── src/
│   ├── main.js
│   └── components/
├── assets/
├── package.json
└── vite.config.js
7. Atualize seu index.html
Modifique o HTML para usar módulos ES:

html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Meu Projeto A-Frame</title>
</head>
<body>
    <a-scene>
        <!-- Sua cena A-Frame -->
    </a-scene>
    
    <!-- Substitua as tags script por módulos -->
    <script type="module" src="/src/main.js"></script>
</body>
</html>
8. Crie o arquivo main.js
Crie src/main.js para importar as dependências:

javascript
// Importe A-Frame e outros componentes
import 'aframe';
import 'aframe-physics-system';
import 'aframe-extras';

// Seus componentes personalizados
import './components/drone-controls.js';
import './components/ring-system.js';

// Inicialize sua aplicação
console.log('A-Frame com Vite carregado!');
🚀 Para executar o projeto
bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
⚠️ Pontos importantes
HTTPS obrigatório: WebXR requer HTTPS, por isso configuramos https: true

Módulos ES: Você precisará converter seus scripts para módulos ES

Importação de componentes: Use import em vez de tags <script>

CORS: O Vite resolve automaticamente problemas de CORS no desenvolvimento

🔄 Migração de scripts existentes
Para componentes A-Frame personalizados, converta de:

javascript
// Antigo (script global)
AFRAME.registerComponent('meu-componente', {
  // ...
});

// Novo (módulo ES)
export default AFRAME.registerComponent('meu-componente', {
  // ...
});
Esta abordagem permite adicionar todos os benefícios do Vite (hot reload, bundling, etc.) ao seu projeto existente sem precisar recriá-lo!

