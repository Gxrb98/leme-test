import { z } from 'zod';

// Schema de validação do formulário de busca
export const searchSchema = z.object({
  // O tipo de busca deve ser uma das opções válidas
  tipoDeBusca: z.enum(['cpf', 'cnpj', 'email', 'telefone', 'endereco', 'nome']),

  // O valor deve ter pelo menos 2 caracteres (validação genérica mínima)
  valor: z.string().min(2, 'Deve inserir um valor válido.'),
})
.superRefine((data, ctx) => {
  const { tipoDeBusca, valor } = data;

  // Validação específica para e-mail
  if (tipoDeBusca === 'email') {
    if (valor.length < 5 || !valor.includes('@')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Digite um e-mail completo, incluindo "@"',
        path: ['valor'],
      });
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(valor)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Formato de e-mail inválido',
          path: ['valor'],
        });
      }
    }
  }

  // Validação para CPF: precisa conter 11 dígitos numéricos
  if (tipoDeBusca === 'cpf') {
    const cpfDigits = valor.replace(/\D/g, '');
    if (cpfDigits.length !== 11) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'CPF deve conter 11 dígitos',
        path: ['valor'],
      });
    }
  }

  // Validação para CNPJ: deve conter exatamente 14 dígitos numéricos
  if (tipoDeBusca === 'cnpj') {
    const cnpjDigits = valor.replace(/\D/g, '');
    if (cnpjDigits.length !== 14) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'CNPJ deve conter 14 dígitos',
        path: ['valor'],
      });
    }
  }

});

// Tipo inferido automaticamente com base no schema
export type SearchSchema = z.infer<typeof searchSchema>;
