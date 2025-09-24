// Importar A-Frame e componentes
import 'aframe';
import 'aframe-environment-component';
import 'aframe-extras';

// Importar estilos
import './style.css';

// Registrar componente de teleporte nativo para Meta Quest 3
AFRAME.registerComponent('quest-teleport', {
  schema: {
    cameraRig: { type: 'selector' },
    teleportOrigin: { type: 'selector' },
    button: { type: 'string', default: 'trigger' },
    curveShootingSpeed: { type: 'number', default: 18 },
    landingMaxAngle: { type: 'number', default: 60 },
    collisionEntities: { type: 'string', default: '' }
  },

  init: function () {
    const el = this.el;
    const data = this.data;
    
    this.teleporting = false;
    this.curve = null;
    this.hit = null;
    
    // Criar curva de teleporte
    this.createTeleportCurve();
    
    // Event listeners
    el.addEventListener(data.button + 'down', this.onButtonDown.bind(this));
    el.addEventListener(data.button + 'up', this.onButtonUp.bind(this));
  },

  createTeleportCurve: function () {
    const curveEl = document.createElement('a-entity');
    curveEl.setAttribute('id', 'teleport-curve-' + this.el.id);
    curveEl.setAttribute('line', {
      start: '0 0 0',
      end: '0 0 -5',
      color: '#00ff00',
      opacity: 0.6,
      visible: false
    });
    this.el.appendChild(curveEl);
    this.curve = curveEl;
  },

  onButtonDown: function () {
    if (!this.curve) return;
    this.teleporting = true;
    this.curve.setAttribute('line', 'visible', true);
    this.updateTeleportCurve();
  },

  onButtonUp: function () {
    if (!this.teleporting) return;
    
    this.teleporting = false;
    this.curve.setAttribute('line', 'visible', false);
    
    if (this.hit) {
      this.teleportToPosition(this.hit.point);
    }
  },

  updateTeleportCurve: function () {
    if (!this.teleporting) return;
    
    const el = this.el;
    const data = this.data;
    const direction = new THREE.Vector3(0, 0, -1);
    const raycaster = new THREE.Raycaster();
    
    // Configurar raycaster
    const worldPosition = new THREE.Vector3();
    const worldQuaternion = new THREE.Quaternion();
    el.object3D.getWorldPosition(worldPosition);
    el.object3D.getWorldQuaternion(worldQuaternion);
    
    direction.applyQuaternion(worldQuaternion);
    raycaster.set(worldPosition, direction);
    
    // Verificar colisão com o chão
    const scene = el.sceneEl;
    const intersects = raycaster.intersectObjects(scene.object3D.children, true);
    
    if (intersects.length > 0) {
      this.hit = intersects[0];
      const endPoint = this.hit.point;
      
      // Atualizar curva
      this.curve.setAttribute('line', {
        start: '0 0 0',
        end: el.object3D.worldToLocal(endPoint.clone()),
        color: '#00ff00'
      });
    }
    
    if (this.teleporting) {
      requestAnimationFrame(this.updateTeleportCurve.bind(this));
    }
  },

  teleportToPosition: function (position) {
    const data = this.data;
    if (data.cameraRig) {
      const rig = data.cameraRig;
      const currentPosition = rig.getAttribute('position');
      rig.setAttribute('position', {
        x: position.x,
        y: currentPosition.y,
        z: position.z
      });
    }
  }
});

// Registrar componentes customizados para Meta Quest 3
AFRAME.registerComponent('quest-controls', {
  schema: {
    speed: { type: 'number', default: 0.1 },
    fly: { type: 'boolean', default: false }
  },
  
  init: function () {
    const el = this.el;
    const data = this.data;
    
    // Configurar movement-controls do aframe-extras
    el.setAttribute('movement-controls', {
      speed: data.speed,
      fly: data.fly,
      constrainToNavMesh: false,
      camera: '#camera'
    });
  }
});

// Componente para configuração WebXR otimizada para Quest 3
AFRAME.registerComponent('webxr-setup', {
  init: function () {
    const sceneEl = this.el;
    
    // Configurar WebXR com recursos necessários
    sceneEl.setAttribute('webxr', {
      requiredFeatures: 'local-floor,hand-tracking',
      optionalFeatures: 'bounded-floor,layers,depth-sensing',
      referenceSpaceType: 'local-floor'
    });
    
    // Otimizações de renderização para Quest 3
    sceneEl.setAttribute('renderer', {
      antialias: false,
      physicallyCorrectLights: true,
      colorManagement: true,
      sortObjects: true,
      foveationLevel: 1 // Foveated rendering para Quest 3
    });
    
    // Configurar VR mode UI
    sceneEl.setAttribute('vr-mode-ui', {
      enabled: true,
      enterVRButton: '#vr-toggle'
    });
  }
});

// Função principal para inicializar a aplicação
function initApp() {
  // Toggle side panel
  const togglePanelBtn = document.getElementById('toggle-panel');
  const sidePanel = document.getElementById('side-panel');
  
  if (togglePanelBtn && sidePanel) {
    togglePanelBtn.addEventListener('click', () => {
      sidePanel.classList.toggle('hidden');
      sidePanel.classList.toggle('w-80');
      sidePanel.classList.toggle('w-0');
    });
  }
  
  // VR toggle com suporte WebXR aprimorado
  const vrToggleBtn = document.getElementById('vr-toggle');
  if (vrToggleBtn) {
    vrToggleBtn.addEventListener('click', () => {
      const scene = document.querySelector('a-scene');
      if (scene && scene.hasLoaded) {
        // Verificar se WebXR está disponível
        if (navigator.xr) {
          navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
            if (supported) {
              scene.enterVR();
            } else {
              showNotification('WebXR não suportado neste dispositivo', 'error');
            }
          });
        } else {
          // Fallback para WebVR
          scene.enterVR();
        }
      }
    });
  }
  
  // Help modal
  const helpBtn = document.getElementById('help-btn');
  const helpModal = document.getElementById('help-modal');
  const closeHelp = document.getElementById('close-help');
  const closeHelpBtn = document.getElementById('close-help-btn');
  
  if (helpBtn && helpModal) {
    helpBtn.addEventListener('click', () => {
      helpModal.classList.remove('hidden');
    });
  }
  
  if (closeHelp && helpModal) {
    closeHelp.addEventListener('click', () => {
      helpModal.classList.add('hidden');
    });
  }
  
  if (closeHelpBtn && helpModal) {
    closeHelpBtn.addEventListener('click', () => {
      helpModal.classList.add('hidden');
    });
  }
  
  // Scene selection com ambientes dinâmicos
  const sceneCards = document.querySelectorAll('.scene-card');
  sceneCards.forEach(card => {
    card.addEventListener('click', () => {
      // Remove active class from all cards
      sceneCards.forEach(c => c.classList.remove('border-purple-500', 'ring-2', 'ring-purple-500'));
      
      // Add active class to clicked card
      card.classList.add('border-purple-500', 'ring-2', 'ring-purple-500');
      
      // Carregar ambiente selecionado
      const env = document.querySelector('[environment]');
      if (env) {
        const presets = ['default', 'contact', 'egypt', 'checkerboard', 'forest', 'goaland', 'yavapai', 'goldmine', 'threetowers', 'poison', 'arches', 'tron', 'japan', 'dream', 'volcano', 'starry', 'osiris'];
        const randomPreset = presets[Math.floor(Math.random() * presets.length)];
        
        env.setAttribute('environment', 'preset', randomPreset);
        showNotification(`Ambiente ${randomPreset} carregado`, 'success');
      }
    });
  });
  
  // Ativar primeira cena por padrão
  if (sceneCards.length > 0) {
    sceneCards[0].classList.add('border-purple-500', 'ring-2', 'ring-purple-500');
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    const scene = document.querySelector('a-scene');
    if (scene) {
      scene.resize();
    }
  });
}

// Função para mostrar notificações
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  const bgColor = type === 'error' ? 'bg-red-600' : type === 'success' ? 'bg-green-600' : 'bg-blue-600';
  
  notification.className = `fixed top-4 right-4 ${bgColor} text-white px-4 py-2 rounded-md shadow-lg fade-in z-50`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.classList.add('opacity-0', 'transition-opacity', 'duration-300');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Inicializar quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', initApp);
