# FORGE BOX

## Intent
Landing page demonstrativa em português brasileiro para apresentar um box de CrossFit a potenciais alunos e servir de portfólio comercial. A ação principal é solicitar uma aula experimental.

## Visual direction
Energia de um box industrial: fotografia esportiva ampla, tipografia condensada, hierarquia editorial e espaço negativo. A lousa do WOD, com um timer tipográfico, é a assinatura visual. Evitar métricas inventadas, aparência de academia convencional e ornamentos sem função.

## Tokens and ownership
`css/style.css :root` é a fonte dos tokens de apresentação. `CONFIG.cores` em `js/data.js` personaliza as duas cores de marca em runtime.
- Fundo: #090909; superfície: #171717; marca: #FF5A1F; hover: #FF7A40.
- Texto: #F5F5F5; secundário: #999999; texto em botões laranja: #090909.
- Display: Anton; subtítulos e dados: Oswald; corpo: Inter.
- Container: 1280px; gutters fluidos; grid de 12 colunas conceitual.
- Botões retangulares, bordas discretas, ícones lineares, foco branco visível.

## Behavior
HTML/CSS/JS puro; sem build, backend ou módulos ES para suportar file://. Dados em `data.js`; interações em `main.js`. Contatos ausentes abrem um dialog demonstrativo; nunca simular agendamento concluído. Periodicidades mostram valores totais explícitos. Horários são exemplos, não disponibilidade ao vivo.

## Accessibility and verification
Navegação semântica, link de salto, dialogs nativos com retorno de foco, abas com setas/Home/End, FAQ com ARIA, lightbox com setas/Escape. Movimento reduzido; scrollbars visíveis; reservar geometria das imagens. Verificar 320, 375, 430, 768, 1024, 1440 e 1920px, file://, contato configurado e não configurado.
