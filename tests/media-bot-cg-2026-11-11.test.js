# Regressão HOPE — média bot Atlas, Campo Grande, referência 11/11/2026
#
# Fontes:
# - INICIALIZADOS MATRIZ CGDE (aba GERAL): 2.018 linhas, 1.687 INICIALIZADO, 325 #N/A e 6 SUSPEITO.
# - Relatorio atlas: cruzamento SERIAL GERAL com Endereçavel Principal do Atlas confirma os 325 N/D e os 6 SUSPEITO.
# - Screenshot do dashboard do bot de 11/11/2026: "Usa/dia" dos modelos visíveis.
# - Supabase public.wms_bot_media_7dias (referência 2026-11-11): 518 total = 193 histórico + 325 N/D.
# Não foram recebidos BAIXADOS ASSINANTES ou MEDIA SERIAIS: os 193 históricos são inferidos da apuração previamente armazenada,
# NÃO revalidados individualmente. Não inferir instalações por dia ou por técnico a partir deste fixture.
#
# Executar: node tests/media-bot-cg-2026-11-11.test.js
"use strict";
const assert=require("node:assert/strict");
const rows=[["GPON WIFI6",104,163,23.3,264],["DUAL BAND 3.1",85,143,20.4,344],["DUAL BAND 3.1 WIFI6",27,48,6.9,86],["DUAL BAND 3.0",19,33,4.7,82],["TV BOX",19,27,3.9,123],["MESH ZTE WIFI6",13,26,3.7,99],["GPON ONT",16,21,3,60],["CHIP",13,16,2.3,179],["TV BOX 4K",8,14,2,14],["HDNG",9,11,1.6,54],["CARD0008",8,10,1.4,247],["MESH ZTE",3,5,0.7,38],["ONT GPON EMPRESARIAL",1,1,0.1,7]];
let sumND=0,sumWeek=0,sumHistorical=0;
for(const [tipo,nd,total,rate,matriz] of rows){
  assert.ok(total>=nd, tipo+": total semanal inferior a N/D");
  assert.equal(Math.round(total/7*10)/10,rate,tipo+": média diferente do vídeo");
  assert.ok(matriz>=0);
  sumND+=nd;sumWeek+=total;sumHistorical+=total-nd;
}
assert.equal(sumND,325);
assert.equal(sumWeek,518);
assert.equal(sumHistorical,193);
assert.equal(rows.find(x=>x[0]==="GPON WIFI6")[4],264);
assert.equal(rows.find(x=>x[0]==="DUAL BAND 3.1")[4],344);
assert.equal(rows.find(x=>x[0]==="DUAL BAND 3.1 WIFI6")[4],86);
assert.equal(rows.find(x=>x[0]==="GPON ONT")[4],60);
console.log("OK: 13 modelos; 325 N/D + 193 anteriores = 518 / 7 = 74,0 equipamentos/dia; médias do vídeo coincidem.");
