# DocuFlow

Uma central de documentos para empresas receberem arquivos, extraírem informações, validarem dados e encaminharem aprovações sem perder o histórico.

> Projeto desenvolvido por mim durante minha formação em Engenharia de Software. O MVP usa documentos e dados de demonstração; nenhum arquivo enviado é realmente transmitido para terceiros.

## Problema

Documentos chegam por e-mail, mensagens e pastas diferentes. Isso dificulta encontrar informações, saber quem precisa aprovar e provar o que aconteceu depois. O DocuFlow organiza esse caminho em uma fila de trabalho.

## Funcionalidades do MVP

- caixa de entrada de documentos;
- filtros por status, tipo e prioridade;
- painel de detalhes com campos extraídos;
- validação de CNPJ, valor e vencimento;
- fluxo de aprovação e rejeição;
- histórico de auditoria;
- simulação de upload e processamento;
- indicadores de pendências e tempo médio;
- interface responsiva.

## Como executar

Abra `index.html` no navegador. Não é necessário instalar dependências.

Para executar os testes das regras de negócio:

```bash
npm test
```

## Decisões técnicas

- A interface usa HTML, CSS e JavaScript puro para manter o MVP fácil de testar e publicar.
- A validação fica em `model.js`, separada dos eventos e da apresentação.
- A extração de dados é simulada e está explicitamente identificada como parte futura do produto.

## Próximos passos

- integrar armazenamento seguro de arquivos;
- adicionar OCR e extração assistida por IA com revisão humana;
- criar usuários, grupos e permissões;
- conectar notificações por e-mail;
- persistir auditoria em uma API;
- adicionar criptografia, retenção e políticas de acesso.

