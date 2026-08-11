export type Project = {
    id: string;
    type?: 'project' | 'case_study'; // tipo do projeto — ausente = 'project' (compatibilidade)
    title: string;
    description: string;
    description_en?: string;
    coverUrl: string;
    images?: string[]; // múltiplas imagens opcionais
    tags?: string[]; // tecnologias/categorias usadas
    demoUrl?: string; // link para demo/site
    repositoryUrl?: string; // link para repositório
    createdAt?: string; // data de criação
    category?: 'web' | 'mobile' | 'design' | 'fullstack'; // categoria do projeto
    discipline?: 'design' | 'development' | 'both'; // área de atuação
  };