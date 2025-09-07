# 💰 Gerenciador Financeiro Pessoal

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![ChatGPT](https://img.shields.io/badge/ChatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white)
![DeepSeek](https://img.shields.io/badge/DeepSeek-0A84FF?style=for-the-badge&logo=deepseek&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)

## 📋 Sobre o Projeto

Sistema completo de gerenciamento financeiro pessoal para controle detalhado de receitas, despesas e investimentos. Desenvolvido com foco em usabilidade e análise visual dos dados financeiros.

**✨ Funcionalidades principais:**
- ✅ **Lançamento flexível** de ganhos e gastos
- ✅ **Dashboard interativo** com múltiplos gráficos
- ✅ **Controle multi-bancos** e formas de pagamento
- ✅ **Análise de investimentos** e acompanhamento
- ✅ **Sistema de parcelamento** inteligente
- ✅ **Interface responsiva** e intuitiva

## 🏗️ Estrutura do Projeto
```
Gerenciador-Financeiro/
├── 📁 scripts/
│   ├── 📄 main.js              # Lógica do formulário de lançamentos
│   └── 📄 dashboard.js         # Gráficos e visualizações do dashboard
│
├── 📁 styles/
│   └── 📄 styles.css           # Estilos CSS para todas as páginas
│
├── 🌐 index.html               # Página inicial com menu
├── 📝 formulario.html          # Formulário para novos lançamentos
├── 📊 dashboard.html           # Dashboard com gráficos
├── ⚙️ server.js                # Servidor API com Express
└── 📁 data/
    └── 📄 bd.json              # Banco de dados em JSON
```


## 🎯 Telas do Sistema

### 1. 🏠 Página Principal
- Navegação simplificada
- Acesso rápido às funcionalidades
- Design limpo e objetivo

### 2. 📝 Formulário de Lançamentos
**Campos disponíveis:**
- **Tipo**: Ganhou/Gastou
- **Valor**: Valor numérico
- **Local**: Banco/Instituição
- **Forma**: Crédito/Débito/Pix/Investimento
- **Parcelas**: Sistema de parcelamento
- **Descrição**: Campo opcional

### 3. 📊 Dashboard Financeiro
**Visualizações disponíveis:**
- 📈 **Evolução dos salários** - Histórico de receitas
- 💰 **Saldo líquido mensal** - Balanço mensal
- 🏦 **Gastos por banco** - Distribuição por instituição
- 📆 **Gastos mensais** - Análise temporal
- 💵 **Total investido** - Acumulado de investimentos
- 🔄 **Salário vs. Investimento** - Comparativo
- 🗓️ **Impacto das parcelas** - Projeção futura

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização responsiva
- **JavaScript ES6+** - Lógica e interatividade
- **Chart.js** - Visualização de dados

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JSON Server** - API REST simulada

### Desenvolvimento
- **Git** - Controle de versão
- **JSON** - Armazenamento de dados
- **Fetch API** - Comunicação HTTP

## ⚡ Como Executar

### Pré-requisitos:
- Node.js 14+
- Navegador moderno

### Instalação:
```bash
# Clone o repositório
git clone <url-do-repositorio>

# Acesse o diretório
cd Gerenciador-Financeiro

# Instale as dependências
npm install

# Execute o servidor
node server.js
```

## 🌐 Acesso

Abra o navegador e acesse: `http://localhost:3000`

---

## 📊 Estrutura de Dados

### Exemplo de lançamento:
```json
{
    "tipo": "gastou",
    "data": "2024-11-20",
    "valor": 850.00,
    "descricao": "Smartphone",
    "local": "Itaú",
    "forma": "Credito",
    "parcelas": 5
  }
```
## 🔌 API Endpoints

## 🎨 Customização
### Adicionar novos bancos:
Edite o select em formulario.html:

```html
<option value="Novo Banco">Novo Banco</option>
```
### Modificar categorias:
Ajuste as opções dos selects conforme necessidade.

## 👥 Público-Alvo
- 👤 Pessoas físicas - Controle financeiro pessoal
- 🎓 Estudantes - Aprendizado de desenvolvimento web
- 💻 Desenvolvedores - Exemplo de dashboard
- 📊 Entusiastas - Educação financeira prática

## 🔒 Segurança e Privacidade
- ✅ Dados locais - Armazenamento local
- ✅ Sem cloud - Controle total
- ✅ Backup simples - Arquivos JSON
- ✅ Offline - Funciona sem internet

## 🚀 Roadmap

- Sistema de categorias personalizável
- Metas financeiras com acompanhamento
- Exportação Excel/PDF
- Importação de extratos
- Orçamento mensal com alertas
- Backup cloud (opcional)
- Modo escuro
- App mobile PWA

## 👨💻 Desenvolvido por

**Matheus "DevFari" Henrique**  
📧 [LinkedIn](https://www.linkedin.com/in/matheus-henrique-gpti/)  
🐙 [GitHub](https://github.com/devFari)














