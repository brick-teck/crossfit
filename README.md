# crossfit — FORGE BOX

Template comercial premium para um box de CrossFit e treinamento funcional. Marca fictícia, conteúdo demonstrativo e fotos ilustrativas.

## Abrir

Abra `index.html` no navegador. Sem instalação, framework, backend ou build. As fotografias são locais; Google Fonts precisa de internet e tem fontes de fallback.

## Estrutura

```text
index.html
css/style.css          # identidade e componentes
css/responsive.css     # adaptações por largura
css/animations.css     # movimento e reduced motion
js/data.js             # configuração, planos, horários e conteúdo
js/main.js             # renderização e interações
assets/images/         # fotografias locais
assets/icons/          # favicon
tests/browser.cjs      # QA opcional, sem dependência de produção
DESIGN.md              # direção e decisões de design
```

## Personalização

Edite `CONFIG` em `js/data.js`:

- `nome`, `slogan`, `cores` e `imagens`: identidade da marca.
- `whatsapp`: país + DDD + número, por exemplo o número real de sua empresa, somente dígitos. Deixe vazio para o modo demonstrativo. Números vazios ou inválidos abrem um modal; não é realizado nenhum agendamento.
- `instagram`: URL HTTPS completa do perfil no Instagram.
- `endereco`: endereço real completo. Vazio mantém a área de mapa demonstrativa. Preenchido gera o mapa incorporado e o link de rota. `mapsUrl` pode fornecer um link HTTPS específico.
- `funcionamento`: horários reais de funcionamento.
- `planos`: benefícios e valores **totais** explícitos para mês, trimestre e ano. Os exemplos não aplicam descontos.
- `horarios`: dias e aulas no formato `[horário, modalidade, coach]`. Uma lista vazia apresenta orientação para consultar a equipe. As vagas não são dados ao vivo.
- `modalidades`, `coaches`, `galeria`, `eventos`, `depoimentos`, `faq`, `wod`: conteúdo e fotografias.

Textos institucionais e títulos estão no HTML. Após configurar um box real, revise também `<title>`, meta description, Open Graph, textos alternativos, avisos demonstrativos, descrições e direitos de imagem. Atualize `og:image` com a URL absoluta da sua publicação.

## GitHub Pages

O projeto usa caminhos relativos e inclui `.nojekyll`. Em **Settings → Pages**, escolha **Deploy from a branch → main → / (root)**. Depois de habilitado, o endereço esperado é `https://brick-teck.github.io/crossfit/`.

O envio do código ao GitHub não habilita automaticamente GitHub Pages.

## Interações

Menu mobile, header dinâmico, seletor mensal/trimestral/anual, grade de segunda a sábado, detalhes de modalidades/coaches, galeria com lightbox, FAQ, contatos WhatsApp, Instagram, mapa configurável, reveal on scroll e voltar ao topo.

Teclado: Tab navega; setas/Home/End alternam dias; setas navegam na galeria; Escape fecha dialogs e menu. Dialogs usam isolamento nativo do fundo e restauram foco. `prefers-reduced-motion` desativa movimento.

## Fotografias e licença

Fotografias obtidas do Unsplash e distribuídas sob a [licença Unsplash](https://unsplash.com/license). Não representam instalações, profissionais ou membros de um box real. Os nomes dos profissionais são fictícios; as pessoas nas fotografias não são esses profissionais. Os perfis não afirmam certificações.

| Arquivo | Fonte |
| --- | --- |
| hero.jpg | [Marvin Cors / CrossFit](https://unsplash.com/photos/twiCf04bT-U) |
| lift.jpg | [Marvin Cors / CrossFit](https://unsplash.com/photos/Zsq-Jczljog) |
| community.jpg | [CrossFit / levantamento](https://images.unsplash.com/photo-1639653816792-c1b786aeff51) |
| barbell.jpg | [CrossFit / agachamento](https://unsplash.com/photos/Ot4itH5r-8M) |
| box.jpg | [Ambiente de treino / imagem de fallback](https://images.unsplash.com/photo-1534438327276-14e5300c3a48) |
| functional.jpg | [Treino funcional](https://images.unsplash.com/photo-1517836357463-d25dfeac3438) |
| mobility.jpg | [Movimento](https://images.unsplash.com/photo-1518611012118-696072aa579a) |
| rings.jpg | [GMB Fitness / argolas](https://unsplash.com/photos/ug_onUKP99Q) |
| rowing.jpg | [Kyle Kranz / remo indoor](https://unsplash.com/photos/ss1YP57gLbM) |
| kettlebell.jpg | [Alonso Reyes / kettlebell](https://unsplash.com/photos/0HlI76m4jxU) |

A licença das fotos não é uma autorização de uso da imagem de uma pessoa como endosso comercial. Para um cliente real, prefira fotografias próprias e autorizadas. Fontes via Google Fonts; ícones SVG lineares locais sem biblioteca externa.

## Verificação opcional

O website não exige Node. Para repetir o QA, instale Playwright **em uma pasta temporária externa ao projeto** e use Microsoft Edge instalado:

```powershell
npm.cmd install --prefix "$env:TEMP\forge-box-qa" playwright
$env:PLAYWRIGHT_MODULE = "$env:TEMP\forge-box-qa\node_modules\playwright"
node tests/browser.cjs
```

O teste abre `index.html` por `file://`, verifica preços, horários, keyboard, dialogs, FAQ, galeria, contatos, imagens, erros de JavaScript, movimento reduzido e overflow em 320, 375, 430, 768, 1024, 1440 e 1920px. Capturas são salvas em `qa-output/`, ignorado pelo Git.
