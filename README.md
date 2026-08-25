# ♞ Knight's Travails — O Feitiço do Cavaleiro

🇧🇷 [Português](#-português) · 🇺🇸 [English](#-english)

Um tabuleiro de xadrez com clima de Hogwarts / A Hogwarts-styled chessboard where you find the shortest path a knight can take between two squares, using **BFS (Breadth-First Search)** over an implicit graph.

---
## Demo
<img width="1920" height="881" alt="knighttravails" src="https://github.com/user-attachments/assets/4aafa8c6-aacc-47a3-bfe7-6a38ab9ec261" />

## 🇧🇷 Português

### 📖 Descrição

O problema clássico *Knight's Travails* modela o tabuleiro como um grafo: cada casa é um vértice, e cada movimento válido de cavalo é uma aresta. Como todas as arestas têm o mesmo "peso" (um movimento), o **BFS** é o algoritmo certo para garantir o menor número de jogadas — diferente do DFS, que explora fundo demais e precisaria de controle extra de ciclos para não se perder.

O projeto expõe a função `knightMoves(inicio, fim)`, que retorna o caminho mais curto entre duas casas, e uma interface visual (tema bruxo) para jogar quantas vezes quiser sem precisar tocar em código.

```js
knightMoves([0, 0], [1, 2]); // => [[0,0],[1,2]]
```

### 🎮 Como usar

1. Abra a página (veja "Como rodar" abaixo).
2. Clique em uma casa do tabuleiro → ela vira a casa **inicial**.
3. Clique em outra casa → ela vira a casa **final**.
4. Clique em **"🪄 Lançar Feitiço"** — o Mapa do Maroto mostra quantos movimentos são necessários e a lista de casas do caminho, enquanto o cavaleiro anda casa por casa no tabuleiro.
5. Clique em **"🔄 Recomeçar"** a qualquer momento para escolher novas casas.

### ▶️ Como rodar

Não há build nem dependências — é HTML/CSS/JS puro com módulos ES nativos.

**Opção 1 — Live Server (recomendado):**
Abra a pasta no VS Code e use a extensão *Live Server* (clique direito em `index.html` → "Open with Live Server"). Módulos ES precisam de um servidor local, não funcionam com `file://`.

**Opção 2 — Servidor rápido com Node ou Python:**
```bash
npx serve .
# ou
python3 -m http.server 8000
```
Depois acesse `http://localhost:8000`.

**Opção 3 — GitHub Pages:**
O projeto já está pronto para deploy: em *Settings → Pages*, selecione a branch `main` e a pasta raiz (`/`). O arquivo `.nojekyll` garante que o GitHub Pages sirva os arquivos como estão.

### 🛠️ Stack

- HTML5 + CSS3 (sem framework)
- JavaScript (ES2020+, módulos ES nativos — `import`/`export`)
- Google Fonts (Cinzel Decorative, MedievalSharp)
- Zero dependências, zero build step

### 🧱 Arquitetura (princípios SOLID)

A lógica do algoritmo é totalmente desacoplada da interface. Cada arquivo tem uma única responsabilidade, e as camadas altas dependem de abstrações, não de implementações concretas:

```
knights-travails/
├── index.html
├── .nojekyll
├── css/
│   ├── main.css                    # layout estrutural, sem cor/tema
│   └── harry-potter-theme.css      # identidade visual bruxa (paleta, fontes)
└── js/
    ├── core/
    │   ├── Position.js             # value object [x,y]: igualdade, validade, chave
    │   ├── KnightMoveProvider.js   # única fonte da regra "como o cavalo se move" (as arestas do grafo)
    │   └── PathFinder.js           # classe abstrata: contrato findPath(start, end)
    ├── algorithms/
    │   └── BFSPathFinder.js        # implementação concreta de PathFinder usando BFS
    ├── services/
    │   └── KnightMovesService.js   # API pública knightMoves(); injeta o PathFinder (DIP)
    ├── ui/
    │   ├── BoardRenderer.js        # desenha o tabuleiro e marca casas (start/end/path)
    │   ├── PathAnimator.js         # anima o cavaleiro andando casa por casa
    │   └── ConsoleLogger.js        # escreve no painel "Mapa do Maroto"
    └── app.js                      # composition root: instancia e conecta tudo
```

**Por que isso é SOLID:**
- **S**RP — cada classe faz uma coisa só (`Position` só descreve uma coordenada, `BoardRenderer` só mexe no DOM, etc.).
- **O**CP — para trocar o algoritmo de busca (ex. DFS, A\*), basta criar uma nova classe que estenda `PathFinder`; nada mais muda.
- **L**SP — qualquer subclasse de `PathFinder` pode substituir outra sem quebrar `KnightMovesService`.
- **I**SP — módulos pequenos e focados (o `ConsoleLogger` não sabe nada sobre tabuleiro, por exemplo).
- **D**IP — `KnightMovesService` e `app.js` dependem da abstração `PathFinder`, não da implementação `BFSPathFinder` diretamente (ela é injetada no construtor).

### Guia rápido para commits

| Arquivo | Do que ele trata |
|---|---|
| `js/core/Position.js` | Modelo de coordenada do tabuleiro |
| `js/core/KnightMoveProvider.js` | Regras de movimento do cavalo (arestas do grafo) |
| `js/core/PathFinder.js` | Contrato abstrato de busca de caminho |
| `js/algorithms/BFSPathFinder.js` | Algoritmo BFS (busca em largura) |
| `js/services/KnightMovesService.js` | Função pública `knightMoves` e formatação de saída |
| `js/ui/BoardRenderer.js` | Renderização e marcação do tabuleiro |
| `js/ui/PathAnimator.js` | Animação do cavaleiro percorrendo o caminho |
| `js/ui/ConsoleLogger.js` | Saída de texto no painel do Mapa do Maroto |
| `js/app.js` | Conecta tudo (composition root) e trata eventos de clique |
| `css/main.css` | Layout estrutural |
| `css/harry-potter-theme.css` | Tema visual bruxo |
| `index.html` | Estrutura da página |

### ✍️ Autoria e créditos

Desenvolvido por **Rayssa Roberta Rodrigues Silva**.

Projeto original e enunciado: [The Odin Project — Knights Travails](https://www.theodinproject.com/lessons/javascript-knights-travails). Aprendizados e referências também consultados na versão em inglês e nas [submissões da comunidade](https://www.theodinproject.com/lessons/javascript-knights-travails/project_submissions?direction=desc&sort=likes_count).

---

## 🇺🇸 English

### 📖 Description

The classic *Knight's Travails* problem models the chessboard as a graph: each square is a vertex, and each valid knight move is an edge. Since every edge has the same "weight" (one move), **BFS** is the right algorithm to guarantee the minimum number of moves — unlike DFS, which digs too deep and would need extra cycle handling to avoid getting stuck.

The project exposes a `knightMoves(start, end)` function that returns the shortest path between two squares, plus a visual interface (wizard theme) so you can play as many times as you like without touching any code.

```js
knightMoves([0, 0], [1, 2]); // => [[0,0],[1,2]]
```

### 🎮 How to use

1. Open the page (see "How to run" below).
2. Click a square on the board → it becomes the **start** square.
3. Click another square → it becomes the **end** square.
4. Click **"🪄 Cast Spell"** — the Marauder's Map reveals how many moves are needed and the list of squares in the path, while the knight walks square by square across the board.
5. Click **"🔄 Reset"** at any time to pick new squares.

### ▶️ How to run

No build step, no dependencies — plain HTML/CSS/JS with native ES modules.

**Option 1 — Live Server (recommended):**
Open the folder in VS Code and use the *Live Server* extension (right-click `index.html` → "Open with Live Server"). ES modules require a local server and won't work over `file://`.

**Option 2 — Quick server with Node or Python:**
```bash
npx serve .
# or
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

**Option 3 — GitHub Pages:**
The project is deploy-ready: under *Settings → Pages*, select the `main` branch and the root folder (`/`). The `.nojekyll` file ensures GitHub Pages serves the files as-is.

### 🛠️ Stack

- HTML5 + CSS3 (no framework)
- JavaScript (ES2020+, native ES modules — `import`/`export`)
- Google Fonts (Cinzel Decorative, MedievalSharp)
- Zero dependencies, zero build step

### 🧱 Architecture (SOLID principles)

The algorithm logic is fully decoupled from the UI. Each file has a single responsibility, and high-level layers depend on abstractions rather than concrete implementations:

```
knights-travails/
├── index.html
├── .nojekyll
├── css/
│   ├── main.css                    # structural layout, theme-agnostic
│   └── harry-potter-theme.css      # wizarding visual identity (palette, fonts)
└── js/
    ├── core/
    │   ├── Position.js             # [x,y] value object: equality, validity, key
    │   ├── KnightMoveProvider.js   # sole source of the "how a knight moves" rule (the graph's edges)
    │   └── PathFinder.js           # abstract class: findPath(start, end) contract
    ├── algorithms/
    │   └── BFSPathFinder.js        # concrete PathFinder implementation using BFS
    ├── services/
    │   └── KnightMovesService.js   # public knightMoves() API; injects the PathFinder (DIP)
    ├── ui/
    │   ├── BoardRenderer.js        # draws the board and marks squares (start/end/path)
    │   ├── PathAnimator.js         # animates the knight walking square by square
    │   └── ConsoleLogger.js        # writes to the "Marauder's Map" output panel
    └── app.js                      # composition root: instantiates and wires everything
```

**Why this is SOLID:**
- **S**RP — each class does one thing (`Position` only describes a coordinate, `BoardRenderer` only touches the DOM, etc.).
- **O**CP — swapping the search algorithm (e.g. DFS, A\*) only requires a new class extending `PathFinder`; nothing else changes.
- **L**SP — any `PathFinder` subclass can replace another without breaking `KnightMovesService`.
- **I**SP — small, focused modules (`ConsoleLogger` knows nothing about the board, for instance).
- **D**IP — `KnightMovesService` and `app.js` depend on the `PathFinder` abstraction, not directly on the `BFSPathFinder` implementation (it's injected via the constructor).

### Quick commit guide

| File | What it covers |
|---|---|
| `js/core/Position.js` | Board coordinate model |
| `js/core/KnightMoveProvider.js` | Knight movement rules (the graph's edges) |
| `js/core/PathFinder.js` | Abstract path-search contract |
| `js/algorithms/BFSPathFinder.js` | BFS (breadth-first search) algorithm |
| `js/services/KnightMovesService.js` | Public `knightMoves` function and output formatting |
| `js/ui/BoardRenderer.js` | Board rendering and marking |
| `js/ui/PathAnimator.js` | Knight-walking-the-path animation |
| `js/ui/ConsoleLogger.js` | Text output on the Marauder's Map panel |
| `js/app.js` | Wires everything together (composition root) and handles click events |
| `css/main.css` | Structural layout |
| `css/harry-potter-theme.css` | Wizarding visual theme |
| `index.html` | Page structure |

### ✍️ Author & credits

Built by **Rayssa Roberta Rodrigues Silva**.

Original project and assignment: [The Odin Project — Knights Travails](https://www.theodinproject.com/lessons/javascript-knights-travails). Learnings and references also drawn from the English version and the [community submissions](https://www.theodinproject.com/lessons/javascript-knights-travails/project_submissions?direction=desc&sort=likes_count).
