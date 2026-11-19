# Pauta — React Native / Expo

Projeto Expo com telas inspiradas na referência enviada:
- Feed de notícias com busca e filtros por categoria
- Detalhe da notícia
- Lista de notícias salvas
- Notícias atualizadas por RSS da Agência Brasil, G1 e BBC News Brasil no app
- Compartilhamento de notícias nos cartões e detalhes pelo menu nativo ou cópia do texto no navegador

A navegação web usa React Router (`/`, `/saved` e `/news/:id`). Android e iOS
continuam usando Expo Router com abas e stack. A aba RSS na web usa a Agência
Brasil, cuja fonte permite requisições do navegador; no app nativo, também são
consultados G1 e BBC News Brasil. As notícias RSS podem ser abertas, salvas e
compartilhadas como as demais notícias.

Para publicar o site em hospedagem estática, configure o servidor para
redirecionar caminhos desconhecidos para `index.html`, permitindo abrir
diretamente as rotas `/saved`, `/rss` e `/news/:id`.

## Executar
1. Instale o Node.js LTS.
2. Extraia o ZIP e abra a pasta do projeto no terminal.
3. Execute `npm install`.
4. Execute `npm run start` e abra no Expo Go, ou use `npm run web`.

As imagens de miniaturas incluídas em `assets/` foram recortadas da imagem de referência fornecida.
