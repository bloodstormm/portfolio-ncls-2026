export type Project = {
    id: string;
    title: string;
    description: string;
    coverUrl: string;
    images?: string[]; // múltiplas imagens opcionais
    tags?: string[]; // tecnologias/categorias usadas
    demoUrl?: string; // link para demo/site
    repositoryUrl?: string; // link para repositório
    createdAt?: string; // data de criação
    category?: 'web' | 'mobile' | 'design' | 'fullstack'; // categoria do projeto
  };