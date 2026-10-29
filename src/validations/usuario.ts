
import { z } from 'zod';

export const criarUsuarioSchema = z.object({
  nome: z.string().trim().min(2).max(100),
  email: z.string().trim().toLowerCase().pipe(z.email()),
  senha: z.string().min(8).max(128),
});

export type CriarUsuarioInput = z.infer<typeof criarUsuarioSchema>;
