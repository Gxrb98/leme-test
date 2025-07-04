import type { TipoDeBusca } from "../../types/Global";

// Dados que serão enviados pelo formulário de busca
export type DadosDoFormulario = {
  tipoDeBusca: TipoDeBusca;
  valor: string;
};


export type Props  = {
    t1: string;
    t2?: string;
}