# 🚀 Guia de Instalação Rápida - Merge Explore

## ⚡ Início Rápido (5 minutos)

### 1. Pré-requisitos
```bash
# Verifique se tem Node.js instalado
node --version  # Deve ser 16.0 ou superior
npm --version   # Deve estar presente
```

### 2. Instalação
```bash
# Clone o repositório
git clone https://github.com/CristianoNaveRealengo/fusionexplore.git
cd MergeExeplore

# Instale dependências
npm install

# Inicie o servidor
npm run dev
```

### 3. Acesso
- **Desktop**: http://localhost:5174/
- **VR**: Mesmo endereço no navegador do headset

## 🥽 Para Meta Quest 3

### Configuração Rápida
1. **Ative o Modo Desenvolvedor** no Quest 3
2. **Conecte à mesma rede Wi-Fi** do computador
3. **Abra o navegador** no Quest 3
4. **Digite o endereço**: `http://[IP-DO-SEU-PC]:5174/`
5. **Clique em "Entrar em VR"**

### Encontrar IP do PC
```bash
# Windows
ipconfig

# Linux/Mac
ifconfig
```

## 🎮 Controles Básicos

### Desktop
- **WASD** - Mover
- **Mouse** - Olhar
- **Clique** - Interagir

### VR (Quest 3)
- **Trigger** - Teletransporte
- **Mãos** - Interação natural
- **Joystick** - Movimento

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev          # Servidor local

# Produção
npm run build        # Build otimizado
npm run preview      # Preview do build

# Debug
npm run dev -- --debug  # Com logs detalhados
```

## 🐛 Problemas Comuns

### Erro de Porta
```bash
# Se a porta 5174 estiver ocupada
npm run dev -- --port 3000
```

### VR não Funciona
- ✅ Use HTTPS (já configurado)
- ✅ Mesma rede Wi-Fi
- ✅ Navegador atualizado

### Modelos não Carregam
- ✅ Verifique pasta `public/`
- ✅ Limpe cache do navegador
- ✅ Recarregue a página

## 📱 Teste Rápido

### Verificação Desktop
1. Abra http://localhost:5174/
2. Veja se carrega o ambiente florestal
3. Use WASD para se mover
4. Verifique se vê 3 objetos: bike, 2 drones

### Verificação VR
1. Clique "Entrar em VR"
2. Coloque o headset
3. Use trigger para se teletransportar
4. Teste interação com objetos

## 🎯 Próximos Passos

- 📖 Leia o [README.md](README.md) completo
- 🔧 Personalize configurações no `.env`
- 🎨 Adicione seus próprios modelos 3D
- 🚀 Faça deploy para produção

---

**Pronto para explorar! 🌟**