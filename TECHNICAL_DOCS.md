# 🔧 Documentação Técnica - Merge Explore

## 📐 Arquitetura do Sistema

### Stack Tecnológico
```
Frontend: A-Frame 1.4.0 + WebXR
Build Tool: Vite 7.1.7
Styling: Tailwind CSS
Physics: aframe-physics-system
Environment: aframe-environment-component
```

### Estrutura de Componentes

#### Core A-Frame
```html
<a-scene>
  ├── <a-assets>           # Carregamento de modelos 3D
  ├── <a-entity environment> # Ambiente procedural
  ├── <a-entity rig>       # Player + Controles VR
  ├── <a-entity objects>   # Objetos 3D interativos
  └── <a-light>           # Sistema de iluminação
</a-scene>
```

## 🎮 Sistema de Controles

### Player Rig (Meta Quest 3)
```html
<a-entity id="rig" 
    quest-controls="speed: 0.5; fly: false; rotationSpeed: 1.5"
    position="0 0.65 0" 
    kinematic-body="shape: box; size: 1 1.8 1">
```

**Parâmetros Explicados:**
- `speed: 0.5` - Velocidade de movimento (otimizada para VR)
- `fly: false` - Desabilita voo (realismo)
- `rotationSpeed: 1.5` - Velocidade de rotação
- `kinematic-body` - Corpo físico do jogador

### Controles de Mão
```html
<!-- Configuração para ambas as mãos -->
<a-entity oculus-touch-controls="hand: [left|right]"
    hand-tracking-controls="hand: [left|right]"
    quest-teleport="cameraRig: #rig; teleportOrigin: #camera; button: trigger">
```

**Funcionalidades:**
- **Hand Tracking** - Rastreamento natural das mãos
- **Touch Controls** - Controles físicos do Quest
- **Teleport** - Sistema de teletransporte com trigger

## ⚡ Sistema de Física

### Configuração Global
```html
<a-scene physics="debug: false; gravity: -2">
```

**Parâmetros:**
- `debug: false` - Visualização de colisões (dev: true)
- `gravity: -2` - Gravidade reduzida para melhor VR

### Tipos de Corpos Físicos

#### Kinematic Body (Player)
```html
kinematic-body="shape: box; size: 1 1.8 1"
```
- **Uso**: Objetos controlados pelo usuário
- **Características**: Não afetado por gravidade, colide com static-body

#### Static Body (Objetos)
```html
static-body="shape: box; size: 3 1.5 3"
```
- **Uso**: Objetos estáticos do mundo
- **Características**: Imóveis, colidem com kinematic-body

### Configurações por Objeto

| Objeto | Tipo | Tamanho (x,y,z) | Propósito |
|--------|------|-----------------|-----------|
| Player | kinematic-body | 1×1.8×1 | Jogador |
| Hover Bike | static-body | 3×1.5×3 | Veículo |
| Buster Drone | static-body | 2×2×2 | Drone pequeno |
| Mech Drone | static-body | 4×3×4 | Robô grande |
| Chão | static-body | 100×0.1×100 | Superfície |

## 🎨 Sistema de Renderização

### Iluminação Otimizada
```html
<!-- Luz ambiente suave -->
<a-light type="ambient" color="#404040" intensity="0.4"></a-light>

<!-- Luz direcional principal -->
<a-light type="directional" position="1 1 1" color="#ffffff" intensity="0.6"></a-light>
```

**Configuração Explicada:**
- **Ambient**: Iluminação base (40% intensidade)
- **Directional**: Luz principal simulando sol (60% intensidade)
- **Posição**: (1,1,1) cria sombras naturais

### Sistema de Sombras
```html
<!-- Sombra da Hover Bike -->
<a-entity id="bike-shadow-group">
    <!-- Sombra principal -->
    <a-circle radius="2" material="color: #000000; opacity: 0.3"
        animation="property: scale; to: 1.1 1.1 1.1; dir: alternate; dur: 2000">
    
    <!-- Sombra difusa -->
    <a-circle radius="3" material="color: #000000; opacity: 0.1"
        animation="property: scale; to: 1.05 1.05 1.05; dir: alternate; dur: 3000">
</a-entity>
```

## 🚁 Sistema de Animações

### Hover Bike - Flutuação
```html
animation__float="
    property: position; 
    to: -8.76639 0.8 -10.42556; 
    dir: alternate; 
    dur: 3000; 
    loop: true; 
    easing: easeInOutSine"
```

**Parâmetros:**
- `property: position` - Anima posição Y
- `dir: alternate` - Vai e volta
- `dur: 3000` - 3 segundos por ciclo
- `easing: easeInOutSine` - Movimento suave

### Buster Drone - Animação Automática
```html
animation-mixer="clip: *; loop: repeat"
```
- Reproduz todas as animações do modelo GLTF
- Loop infinito

## 🌍 Sistema de Ambiente

### Environment Component
```html
<a-entity environment="preset: forest; dressingAmount: 500; grid: 1x1">
```

**Configurações:**
- `preset: forest` - Ambiente florestal
- `dressingAmount: 500` - Densidade de vegetação
- `grid: 1x1` - Tamanho do terreno

### Configurações Disponíveis
```javascript
// Presets disponíveis
presets: [
    'forest',    // Floresta (atual)
    'desert',    // Deserto
    'canyon',    // Canyon
    'island',    // Ilha
    'arctic',    // Ártico
    'space'      // Espaço
]
```

## 📱 Otimizações para VR

### Performance
```html
<!-- Renderer otimizado -->
renderer="
    antialias: true;
    colorManagement: true;
    sortObjects: true;
    physicallyCorrectLights: true"
```

### Configurações de Qualidade
```javascript
// Configurações recomendadas para Quest 3
const vrOptimizations = {
    antialias: true,           // Suavização de bordas
    foveationLevel: 1,         // Renderização foveada
    refreshRate: 90,           // 90 FPS para Quest 3
    resolution: 0.8            // 80% da resolução nativa
}
```

## 🔧 APIs e Eventos

### Eventos A-Frame Importantes
```javascript
// Entrada em VR
scene.addEventListener('enter-vr', () => {
    console.log('Modo VR ativado');
});

// Saída do VR
scene.addEventListener('exit-vr', () => {
    console.log('Modo VR desativado');
});

// Carregamento de modelo
entity.addEventListener('model-loaded', () => {
    console.log('Modelo 3D carregado');
});
```

### Controles Customizados
```javascript
// Registrar componente customizado
AFRAME.registerComponent('custom-controls', {
    schema: {
        speed: {type: 'number', default: 1.0}
    },
    
    init: function() {
        // Inicialização
    },
    
    tick: function() {
        // Loop de atualização
    }
});
```

## 🐛 Debug e Monitoramento

### Ativando Debug
```html
<!-- Debug de física -->
<a-scene physics="debug: true">

<!-- Debug de performance -->
<a-scene stats>
```

### Console Logs Úteis
```javascript
// Verificar componentes carregados
console.log(AFRAME.components);

// Verificar sistemas ativos
console.log(AFRAME.systems);

// Verificar entidades na cena
console.log(document.querySelector('a-scene').children);
```

### Métricas de Performance
```javascript
// FPS atual
const stats = document.querySelector('a-scene').systems.stats;
console.log('FPS:', stats.fps);

// Contagem de entidades
const entities = document.querySelectorAll('a-entity').length;
console.log('Entidades:', entities);
```

## 🚀 Deploy e Produção

### Build Otimizado
```bash
# Build para produção
npm run build

# Análise do bundle
npm run build -- --analyze
```

### Configurações de Servidor
```nginx
# Nginx para VR
server {
    listen 443 ssl http2;
    
    # Headers necessários para WebXR
    add_header Cross-Origin-Embedder-Policy credentialless;
    add_header Cross-Origin-Opener-Policy same-origin;
    
    # Cache para assets
    location ~* \.(glb|gltf|jpg|png|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Checklist de Deploy
- ✅ HTTPS configurado
- ✅ Headers CORS corretos
- ✅ Assets otimizados
- ✅ Compressão gzip ativa
- ✅ Cache configurado
- ✅ Teste em dispositivos VR

---

**Documentação mantida pela equipe de desenvolvimento**  
*Última atualização: Janeiro 2025*