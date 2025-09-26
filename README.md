# 🚀 Merge Explore - Experiência A-Frame VR

Uma aplicação de realidade virtual imersiva construída com A-Frame, otimizada para Meta Quest 3 e navegadores web.

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Requisitos do Sistema](#-requisitos-do-sistema)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Configuração VR](#-configuração-vr)
- [Física e Colisões](#-física-e-colisões)
- [Modelos 3D](#-modelos-3d)
- [Desenvolvimento](#-desenvolvimento)
- [Solução de Problemas](#-solução-de-problemas)

## 🎯 Visão Geral

O **Merge Explore** é uma experiência de realidade virtual que combina elementos futurísticos em um ambiente florestal. O projeto utiliza tecnologias web modernas para criar uma experiência imersiva acessível tanto em navegadores desktop quanto em dispositivos VR.

### Tecnologias Utilizadas

- **A-Frame 1.4.0** - Framework WebVR/WebXR
- **Vite 7.1.7** - Build tool e servidor de desenvolvimento
- **Tailwind CSS** - Framework CSS para interface
- **iwer 2.1.1** - Componentes VR adicionais
- **aframe-extras 7.0.0** - Extensões para A-Frame
- **aframe-environment-component 1.3.2** - Ambientes procedurais

## ✨ Funcionalidades

### 🎮 Experiência VR
- **Suporte completo ao Meta Quest 3**
- **Controles de mão com hand tracking**
- **Sistema de teletransporte**
- **Navegação WASD para desktop**
- **Cursor interativo com fuse timeout**

### 🌍 Ambiente
- **Ambiente florestal procedural**
- **Sistema de iluminação otimizado**
- **Sombras dinâmicas**
- **Física realista com colisões**

### 🚁 Objetos Interativos
- **Hover Bike** - Veículo flutuante com animação
- **Buster Drone** - Drone com animações automáticas
- **Mech Drone** - Robô estático de grande porte

## 💻 Requisitos do Sistema

### Para Desenvolvimento
- **Node.js** 16.0 ou superior
- **npm** ou **yarn**
- **Navegador moderno** com suporte a WebXR

### Para VR
- **Meta Quest 3** (recomendado)
- **Meta Quest 2**
- **Qualquer headset compatível com WebXR**

### Para Desktop
- **Chrome 90+**
- **Firefox 85+**
- **Edge 90+**

## 🛠 Instalação

### 1. Clone o Repositório
```bash
git clone https://github.com/CristianoNaveRealengo/fusionexplore.git
cd MergeExeplore
```

### 2. Instale as Dependências
```bash
npm install
```

### 3. Inicie o Servidor de Desenvolvimento
```bash
npm run dev
```

### 4. Acesse a Aplicação
- **Desktop**: http://localhost:5174/
- **VR**: Use o mesmo endereço no navegador do headset

## 🎯 Como Usar

### 🖥 Modo Desktop

#### Controles Básicos
- **W, A, S, D** - Movimentação
- **Mouse** - Olhar ao redor
- **Clique** - Interagir com objetos
- **Botão "Entrar em VR"** - Ativar modo VR

#### Navegação
1. Use as teclas WASD para se mover pelo ambiente
2. Mova o mouse para olhar ao redor
3. O cursor circular no centro permite interações

### 🥽 Modo VR (Meta Quest 3)

#### Controles de Mão
- **Trigger** - Teletransporte
- **Hand Tracking** - Interação natural
- **Joystick** - Movimentação alternativa

#### Iniciando VR
1. Clique no botão "Entrar em VR"
2. Coloque o headset
3. Use os controles de mão para navegar
4. Aponte e pressione trigger para se teletransportar

### 🎮 Interações Disponíveis

#### Objetos com Física
- **Hover Bike**: Veículo flutuante com colisão
- **Buster Drone**: Drone animado com colisão
- **Mech Drone**: Robô grande com colisão
- **Chão**: Superfície sólida para caminhada

## 📁 Estrutura do Projeto

```
MergeExeplore/
├── 📄 index.html          # Arquivo principal da aplicação
├── 📄 package.json        # Dependências e scripts
├── 📄 README.md          # Esta documentação
├── 📁 public/            # Assets públicos
│   ├── 🎮 buster_drone.glb
│   ├── 🏍 hover_bike_05.glb
│   └── 🤖 mech_drone.glb
├── 📁 src/               # Código fonte
│   ├── 📄 main.js        # JavaScript principal
│   └── 📄 style.css      # Estilos CSS
└── 📁 dist/              # Build de produção
```

## 🥽 Configuração VR

### Meta Quest 3 - Configuração Otimizada

```html
<!-- Player Rig otimizado -->
<a-entity id="rig" 
    quest-controls="speed: 0.5; fly: false; rotationSpeed: 1.5"
    position="0 0.65 0" 
    kinematic-body="shape: box; size: 1 1.8 1">
```

### Controles de Mão
```html
<!-- Mão Esquerda -->
<a-entity id="leftController" 
    oculus-touch-controls="hand: left"
    hand-tracking-controls="hand: left"
    quest-teleport="cameraRig: #rig; teleportOrigin: #camera; button: trigger">
</a-entity>

<!-- Mão Direita -->
<a-entity id="rightController" 
    oculus-touch-controls="hand: right"
    hand-tracking-controls="hand: right"
    quest-teleport="cameraRig: #rig; teleportOrigin: #camera; button: trigger">
</a-entity>
```

## ⚡ Física e Colisões

### Sistema de Física
```html
<a-scene physics="debug: false; gravity: -2">
```

### Configurações de Colisão

#### Player (Jogador)
```html
kinematic-body="shape: box; size: 1 1.8 1"
```

#### Objetos Estáticos
```html
<!-- Hover Bike -->
static-body="shape: box; size: 3 1.5 3"

<!-- Buster Drone -->
static-body="shape: box; size: 2 2 2"

<!-- Mech Drone -->
static-body="shape: box; size: 4 3 4"
```

#### Chão Invisível
```html
<a-plane static-body="shape: box; size: 100 0.1 100">
```

## 🎨 Modelos 3D

### Assets Inclusos

| Modelo | Arquivo | Escala | Posição | Animação |
|--------|---------|--------|---------|----------|
| **Hover Bike** | `hover_bike_05.glb` | 1.5x | (-8.77, 0.5, -10.43) | Flutuação |
| **Buster Drone** | `buster_drone.glb` | 1.2x | (-2, 3, -10.6) | Automática |
| **Mech Drone** | `mech_drone.glb` | 3x | (2, 0.1, -7) | Estático |

### Carregamento de Assets
```html
<a-assets>
    <a-asset-item id="buster_drone" src="/buster_drone.glb"></a-asset-item>
    <a-asset-item id="mech_drone" src="/mech_drone.glb"></a-asset-item>
    <a-asset-item id="hover_bike" src="/hover_bike_05.glb"></a-asset-item>
</a-assets>
```

## 🔧 Desenvolvimento

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

### Estrutura de Desenvolvimento

#### Servidor Local
- **Porta**: 5174
- **Hot Reload**: Ativado
- **HTTPS**: Configurado para VR

#### Dependências Principais
```json
{
  "aframe": "^1.4.0",
  "aframe-environment-component": "^1.3.2",
  "aframe-extras": "^7.0.0",
  "iwer": "^2.1.1"
}
```

### Adicionando Novos Modelos

1. **Coloque o arquivo .glb na pasta `public/`**
2. **Adicione ao assets:**
```html
<a-asset-item id="novo-modelo" src="/novo-modelo.glb"></a-asset-item>
```
3. **Use na cena:**
```html
<a-entity gltf-model="#novo-modelo" position="0 0 0"></a-entity>
```

## 🐛 Solução de Problemas

### Problemas Comuns

#### VR não Funciona
- ✅ Verifique se o navegador suporta WebXR
- ✅ Certifique-se de que está usando HTTPS
- ✅ Teste em um headset compatível

#### Modelos não Carregam
- ✅ Verifique se os arquivos .glb estão na pasta `public/`
- ✅ Confirme se os IDs dos assets estão corretos
- ✅ Verifique o console do navegador para erros

#### Performance Baixa
- ✅ Reduza a qualidade dos modelos
- ✅ Diminua a quantidade de objetos na cena
- ✅ Otimize as texturas

#### Colisões não Funcionam
- ✅ Verifique se o sistema de física está ativo
- ✅ Confirme se os objetos têm `static-body` ou `kinematic-body`
- ✅ Ajuste os tamanhos das caixas de colisão

### Logs de Debug

#### Console do Navegador
```javascript
// Verificar se A-Frame carregou
console.log(AFRAME.version);

// Verificar componentes carregados
console.log(AFRAME.components);
```

#### Física Debug
```html
<!-- Ativar visualização de física -->
<a-scene physics="debug: true; gravity: -2">
```

## 📞 Suporte

### Recursos Úteis
- **A-Frame Docs**: https://aframe.io/docs/
- **WebXR Specs**: https://immersiveweb.dev/
- **Meta Quest Dev**: https://developer.oculus.com/

### Contribuição
1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

---

**Desenvolvido com ❤️ usando A-Frame e WebXR**

*Última atualização: Janeiro 2025*