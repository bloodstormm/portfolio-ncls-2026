# 🔐 Guia do Painel Administrativo

Este guia explica como usar o painel administrativo para gerenciar os projetos do seu portfólio.

## 🚀 Como Acessar

1. **Navegue para a página de admin**: `http://localhost:3000/admin` (ou sua URL de produção)
2. **Digite a senha de administrador**: Por padrão é `nicaoifood` (configurada no .env.local)
3. **Clique em "Acessar Painel"**

## ✨ Funcionalidades

### 📝 Adicionar Novo Projeto

O formulário inclui os seguintes campos:

#### Campos Obrigatórios
- **Título do Projeto**: Nome do seu projeto
- **Imagem de Capa**: Imagem principal que aparecerá nas listagens
- **Descrição**: Editor rich text com formatação (negrito, itálico, listas, links, etc.)

#### Campos Opcionais
- **Categoria**: Web Development, Mobile App, UI/UX Design, ou Full Stack
- **Imagens Adicionais**: Até 10 imagens para a galeria do projeto
- **Tags/Tecnologias**: Tecnologias usadas no projeto (React, Next.js, etc.)
- **URL da Demo**: Link para o projeto/demo online
- **URL do Repositório**: Link para o código no GitHub

### 🖼️ Upload de Imagens

- **Formatos suportados**: JPEG, PNG, WebP
- **Tamanho máximo**: 5MB por imagem
- **Drag & Drop**: Arraste e solte as imagens ou clique para selecionar
- **Preview**: Visualize as imagens antes de salvar
- **Remoção**: Clique no X para remover imagens

### ✍️ Editor Rich Text

O editor de texto suporta:
- **Formatação**: Negrito, itálico, código
- **Estrutura**: Parágrafos, listas ordenadas/não ordenadas, citações
- **Links**: Adicione links para sites externos
- **Placeholder**: Texto de exemplo para orientar a escrita

## 🔒 Configurações de Segurança

### Alterando a Senha

1. Abra o arquivo `.env.local`
2. Altere o valor de `NEXT_PUBLIC_ADMIN_PASSWORD`
3. Reinicie o servidor de desenvolvimento

```env
NEXT_PUBLIC_ADMIN_PASSWORD="sua_nova_senha_segura"
```

### ⚠️ Importante para Produção

- **Nunca** compartilhe sua senha de admin
- Use uma senha forte e única
- Considere implementar autenticação mais robusta para produção
- Mantenha backups regulares do Firebase

## 🗄️ Estrutura de Dados

Os projetos são salvos no Firebase Firestore com a seguinte estrutura:

```typescript
{
  id: string;              // Gerado automaticamente
  title: string;           // Título do projeto
  description: string;     // HTML do editor rich text
  coverUrl: string;        // URL da imagem de capa
  images?: string[];       // URLs das imagens adicionais
  tags?: string[];         // Tecnologias/tags
  demoUrl?: string;        // URL da demo
  repositoryUrl?: string;  // URL do repositório
  category?: string;       // Categoria do projeto
  createdAt: string;       // Data de criação (ISO string)
}
```

## 🔄 Fluxo de Trabalho

1. **Acesse** `/admin` e faça login
2. **Preencha** o formulário com as informações do projeto
3. **Faça upload** da imagem de capa (obrigatório)
4. **Adicione** imagens adicionais se desejar
5. **Escreva** a descrição usando o editor rich text
6. **Adicione** tags/tecnologias relevantes
7. **Inclua** URLs de demo e repositório se disponíveis
8. **Clique** em "Criar Projeto"

## 🐛 Solução de Problemas

### Erros de Upload
- Verifique se as imagens são menores que 5MB
- Confirme que o Firebase Storage está configurado
- Verifique a conexão com a internet

### Erros de Autenticação
- Confirme que a senha está correta
- Verifique se o .env.local está carregado
- Tente limpar o cache do navegador

### Projetos Não Aparecem
- Verifique se o Firebase Firestore está configurado
- Confirme que os dados foram salvos no console do Firebase
- Verifique se há erros no console do navegador

## 📱 URLs de Acesso

- **Home**: `http://localhost:3000/`
- **Login Admin**: `http://localhost:3000/admin`
- **Painel Admin**: `http://localhost:3000/admin/projects`
- **Todos os Projetos**: `http://localhost:3000/projects`
- **Projeto Individual**: `http://localhost:3000/projects/[id]`

## 🎨 Personalização

O design do painel administrativo segue o mesmo tema do seu portfólio:
- Usa as mesmas fontes (Wulkan, Odasans)
- Mantém a paleta de cores
- Animações consistentes com o resto do site
- Responsivo para todos os dispositivos

---

**Dica**: Sempre teste em ambiente de desenvolvimento antes de usar em produção! 🚀