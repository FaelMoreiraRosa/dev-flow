import argon2 from 'argon2';

export function hashSenha(senha: string): Promise<string> {
  return argon2.hash(senha, { type: argon2.argon2id });
}
