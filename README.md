# Agentic RAG · MKLab presentation

A full-page, particle-animated presentation that tells the story of an
Agentic RAG solution: Rag the chat bot, from newborn to agent. Built on
the MKLab Living Canvas (the particle system from mklab.se) with plain
HTML, CSS and vanilla JavaScript. No build step, no dependencies.

## Run it

```sh
cd rag-visualization
python3 -m http.server 8080
```

Open http://localhost:8080 in a browser. A local server is required
(the particle logo intro reads pixel data from the logo PNG, which
browsers block on file://). Fonts load from Google Fonts, so the fancy
typefaces need internet; the deck still works offline with fallbacks.

## Presenting

- Space, arrow keys or PageDown/PageUp move between slides
- Home / End jump to the first / last slide
- F toggles fullscreen
- The cursor hides itself while idle
- Scrolling works too; slides snap to the viewport

## Slides

1. Title (particle logo intro plays on load)
2. Born: Rag gets an LLM brain
3. Memory: the session layer between Rag and the LLM
4. The wall: private data the LLM cannot reach
5. Embeddings: document to chunks to vectors in meaning space
6. Vector search: the question finds its nearest neighbours
7. Augmentation: retrieved chunks make a better prompt
8. Agency: the vector database becomes a tool the model calls
9. The whole picture: end to end with the streamed answer
10. Outro: hand-over to the real Azure architecture

Scenes live in `assets/js/canvas.js` (one layout + one targets branch +
one structure branch per scene). Slide copy lives in `index.html`.
Brand tokens in `assets/css/tokens/` are copied from mklab.se.
