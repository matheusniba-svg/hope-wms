# HOPE — Procisa WMS (Campo Grande)

Frontend estático para GitHub Pages. **Backend único:** Supabase HOPE.

- `/` — painel administrativo v18
- `/tecnico/` — cadastro, solicitação de acesso, carga própria e pedidos de materiais

O projeto usa **chave publicável do Supabase**, nunca `service_role`. Dados protegidos com Auth e RLS no banco.

**Publicação:** Settings → Pages → Deploy from a branch → `main` → `/(root)` → Save.

**Importante:** as páginas estão publicamente visíveis como código-fonte, mas os dados dependem de login e autorização do servidor. Não inclua relatórios, planilhas, senhas ou chaves secretas neste repositório.

**Acesso de técnicos:** criar conta, confirmar e-mail se solicitado, solicitar vínculo por login Z e aguardar aprovação do administrador.

O banco HOPE original e as importações não são alterados durante a publicação.
