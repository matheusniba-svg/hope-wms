# HOPE WMS — Extração útil de bot_materiais v2
Data: 2026-11-11. Escopo exclusivo: Procisa CAMPO GRANDE — MS (fornecedor SAP 1000805).

## Origem e limites
Análise do arquivo do usuário `bot_materiais 1(2).py` (1.584 linhas). Ele automatiza um aplicativo SAP de ordens de serviço (WO) via Playwright, após login humano e DUO. **Não é fonte de instalações, custódia ou saldo do Conect**. O código não substitui `bot_atlas.py`, `coletor_connect.py`, BAIXADOS ou os KPIs Conect. Não copiar cookies, perfis de navegador, automação de interface ou credenciais para o GitHub Pages. O HOPE não deve manipular WO externa sem integração autorizada.

## Regras que fazem sentido no HOPE
1. **Gabaritos de materiais por tipo de serviço** (função `carregar_cerebro`): aba SALDO com saldo por código; outras abas como GPON, GPON2, HFC, REDE com código, descrição e quantidade máxima; célula verde = reposição regular, outra cor = rodízio. **A planilha original do gabarito não foi fornecida: não inventar material, mínimo nem máximo.**
2. **Equivalências SAP e descrições** (`regra_equivalente`): casar código exato primeiro, descrição normalizada em seguida; aceitar equivalência por família apenas quando inequívoca; desempatar com maior saldo, mas registrar a justificativa e exigir validação administrativa para substituir códigos.
3. **Tipo de instalação** (`escolher_regras`): GPON Casa (C) versus Unidade (U/GPON2), HFC e outros; REDE complementa WO principal, não concorre com ela. Exemplos codificados no bot: drop C `22061736`, U `22026265`; equivalência `22025052 -> 22058258`. São exemplos, NÃO cadastrar como equivalências oficiais até validar o catálogo atual.
4. **Quantidade e indisponibilidade** (`limitar`, `planejar_inteligente`): respeitar mínimo/máximo e saldo; não recomendar como pronto item com saldo zero. Não interpretar o `SALDO` do SAP como `No Estoque` do Conect ou Matriz.
5. **Rodízio determinístico por WO** (`planejar_inteligente`): `rodizio_a_cada=4`; por família e chave estável (WO) para que reprocessar dê o mesmo resultado. MARCADOR tem seleção estável por WO. Reservar para futura etapa de miscelâneas.
6. **Rascunho antes de saída**: `planejar_inteligente` devolve ações adicionar, ajustar, remover e manter; o HOPE deve inicialmente gerar **apenas propostas de kits**, nunca alterar automaticamente saldo, custódia ou sistema de WO.
7. **Transações verificadas e idempotentes** (`processar_wo_autonomo`, `concluidas`): chave única por WO/serial/evento; não contar duas vezes; guardar origem, data, responsável e status planejado/separado/entregue/aceito. Só confirmar execução após reconciliação com a fonte oficial.
8. **Falhas isoladas**: erro de um item não invalida os outros; registrar motivos, sem concluir pedidos incompletos silenciosamente; distinguir erro de sessão de erro operacional.
9. **Modo simulação** (`lote_autonomo`): gerar mudanças projetadas e relatório sem qualquer efeito no saldo. Priorizar este modo ao incluir regras de materiais.

## Distinções fundamentais
- Equipamentos serializados: Conect (posição, carga e aceite) + NAtlas (assinante) + BAIXADOS (instalações) + Matriz (histórico).
- Miscelâneas/materiais WO: catálogo SAP e regras de serviço; **não são baixas de equipamento e não podem entrar na média de instalações**.
- Estoque reservado != estoque entregue; entrega != aceite no Conect; `PAGOS` é repasse físico, não pagamento monetário.
- SAP original deve ser preservado no banco; remover zeros à esquerda só na interface.
- Apenas Campo Grande; qualquer outra Base deve ficar fora da posição CG.

## Ordem de implementação para o HOPE (sem aumentar custo)
**1. Estabilizar importação e média do bot Atlas/Conect** e testar 1.648 seriais do Conect contra 1.644 já importados, sem apagar o histórico.
**2. Criar catálogo editável de equivalências SAP e de kits por serviço** a partir de planilha de gabarito fornecida e validada pelo administrador; exigem dados da planilha ainda não enviada.
**3. Simulador de requisições**: modelo, quantidade sugerida, carga, pendências, dias de cobertura, motivo da sugestão, disponibilidade e discrepância.
**4. Fluxo de separação/entrega confirmado**, reconciliação com Conect e log imutável.
**5. Só depois avaliar integração externa autorizada**, distinta do site estático GitHub Pages. Não importar nem executar o robô Playwright no site.

## Testes obrigatórios
- Mesmo arquivo duas vezes: nenhuma nova baixa nem saída.
- Mesmo serial em estados distintos: bloquear saldo e reportar divergência.
- Mesmo SAP equivalente com duas descrições: não substituir automaticamente sem confirmação.
- Falta de saldo: proposta mostra insuficiente, não confirma entrega.
- Serviço Casa vs Unidade: gabarito correto; outros serviços não recebem kit GPON por engano.
- Reprocessar a mesma WO: rodízio e marcadores reproduzíveis.
- CSV/planilha parcial: não sobrescrever fotografia completa.
- Sem gabarito de materiais: mostrar indisponível, nunca inventar quantidade.

**Status**: documentação técnica de engenharia reversa. Nenhuma automação de WO ou alteração no saldo do Supabase decorre deste documento.