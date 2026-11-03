# Pauta — React Native / Expo

Projeto Expo com telas inspiradas na referência enviada:
- Feed de notícias com busca e filtros por categoria
- Detalhe da notícia
- Lista de notícias salvas
- Compartilhamento de notícias pelo menu nativo ou cópia do texto no navegador

A navegação web usa React Router (`/`, `/saved` e `/news/:id`). Android e iOS
continuam usando Expo Router com abas e stack, sem alterar a experiência nativa.
As telas, filtros, pesquisa e notícias salvas são compartilhados entre as
plataformas.

Para publicar o site em hospedagem estática, configure o servidor para
redirecionar caminhos desconhecidos para `index.html`, permitindo abrir
diretamente as rotas `/saved` e `/news/:id`.

## Executar
1. Instale o Node.js LTS.
2. Extraia o ZIP e abra a pasta do projeto no terminal.
3. Execute `npm install`.
4. Execute `npm run start` e abra no Expo Go, ou use `npm run web`.

As imagens de miniaturas incluídas em `assets/` foram recortadas da imagem de referência fornecida.
