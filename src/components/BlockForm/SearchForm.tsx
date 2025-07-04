import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import {
  FormWrapper,
  LabelGroup,
  ErrorText,
  Button,
  Container,
  InputsRow,
  FormSection
} from './searchFormStyles.ts';
import { BlockTitle } from './BlockTitle.tsx';
import type { Entidade, Pessoa, Empresa } from '../../types/Entidade';
import type { ControllerRenderProps } from 'react-hook-form';
import type { TipoDeBusca } from '../../types/Global.ts';
import type { SearchSchema } from './searchSchema.ts';
import { searchSchema } from './searchSchema.ts';

type Props = {
  setHistorico: React.Dispatch<React.SetStateAction<Entidade[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setNoResults: React.Dispatch<React.SetStateAction<boolean>>;
  setTipoBuscaSelecionado: React.Dispatch<React.SetStateAction<TipoDeBusca>>;
  setValorBuscado: React.Dispatch<React.SetStateAction<string>>;
};

// Lista fixa dos tipos de busca disponíveis
const TIPOS_BUSCA: TipoDeBusca[] = ['cpf', 'cnpj', 'email', 'telefone', 'endereco', 'nome'];

export const SearchForm = ({
  setHistorico,
  setLoading,
  setNoResults,
  setTipoBuscaSelecionado,
  setValorBuscado,
}: Props) => {
  const ultimoValorBuscado = localStorage.getItem('ultimoValorBuscado') || '';
  const ultimoTipoBusca = (localStorage.getItem('ultimoTipoBusca') as TipoDeBusca) || 'cpf';

  const [tipoSelecionado, setTipoSelecionado] = useState<TipoDeBusca>(ultimoTipoBusca);

  // Hook do React Hook Form com validação usando Zod
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      tipoDeBusca: ultimoTipoBusca,
      valor: ultimoValorBuscado
    },
    mode: 'onChange'
  });

  const tipoDeBusca = watch('tipoDeBusca');

  // Atualiza o tipo selecionado quando o usuário muda
  useEffect(() => {
    setTipoSelecionado(tipoDeBusca);
    setTipoBuscaSelecionado(tipoDeBusca);
  }, [tipoDeBusca, setTipoBuscaSelecionado]);

  // Simula busca de dados (mock)
  const fetchEntidades = async (): Promise<Entidade[]> => {
    const response = await fetch('/mock/entidades.json');
    if (!response.ok) throw new Error('Erro ao carregar os dados');
    return response.json();
  };

  // Normaliza o texto para busca (sem acentos, espaços, etc)
  const normalizarTexto = (texto: string) =>
    texto.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w@.]/g, '');

  // Verifica se há trecho comum entre dois CPFs (3 dígitos consecutivos)
  const temTrechoComum = (cpfBuscado: string, cpfRegistrado: string): boolean => {
    const a = cpfBuscado.replace(/\D/g, '');
    const b = cpfRegistrado.replace(/\D/g, '');
    if (a.length !== 11 || b.length !== 11) return false;
    return [...Array(9)].some((_, i) => b.includes(a.slice(i, i + 3)));
  };

  // Aplica o filtro dependendo do tipo de busca escolhido
  const aplicarFiltro = (tipo: TipoDeBusca, valor: string, entidade: Entidade): boolean => {
    const limpo = valor.replace(/\D/g, '');
    const texto = normalizarTexto(valor);

    switch (tipo) {
      case 'cpf':
        return entidade.tipo === 'pessoa' && temTrechoComum(valor, (entidade as Pessoa).cpf || '');
      case 'cnpj':
        return entidade.tipo === 'empresa' && (entidade as Empresa).cnpj?.replace(/\D/g, '') === limpo;
      case 'telefone':
        return entidade.telefones?.some(t => t.replace(/\D/g, '') === limpo);
      case 'email':
        return entidade.emails?.some(e => {
          const [bUser, bDom] = texto.split('@');
          const [eUser, eDom] = e.toLowerCase().split('@');
          return (bUser?.length >= 3 && eUser.includes(bUser)) || (bDom?.length >= 3 && eDom === bDom);
        });
      case 'endereco':
        return entidade.enderecos?.some(end => normalizarTexto(end).includes(texto));
      case 'nome':
        return normalizarTexto(entidade.nome).includes(texto);
      default:
        return false;
    }
  };

  // Função que roda ao enviar o formulário
  const onSubmit = async (data: SearchSchema) => {
    setLoading(true);
    setNoResults(false);

    // Salva o tipo e valor da busca no localStorage
    localStorage.setItem('ultimoTipoBusca', data.tipoDeBusca);
    localStorage.setItem('ultimoValorBuscado', data.valor);

    try {
      const entidades = await fetchEntidades();
      const resultados = entidades.filter(entidade =>
        aplicarFiltro(data.tipoDeBusca, data.valor, entidade)
      );

      if (resultados.length === 0) setNoResults(true);

      // Atualiza o histórico sem duplicar registros já existentes
      const historicoLocal = JSON.parse(localStorage.getItem('historico') || '[]') as Entidade[];
      const novosHistorico = [
        ...resultados,
        ...historicoLocal.filter(h => !resultados.some(r => r.id === h.id))
      ].slice(0, 10);

      localStorage.setItem('historico', JSON.stringify(novosHistorico));
      setHistorico(novosHistorico);
      setValorBuscado(data.valor);
    } catch (error) {
      console.error('Erro na busca:', error);
    } finally {
      setLoading(false);
    }
  };

  // Reseta o formulário e limpa o localStorage
  const handleClear = () => {
    reset({ tipoDeBusca: 'cpf', valor: '' });
    setHistorico([]);
    setNoResults(false);
    localStorage.removeItem('ultimoTipoBusca');
    localStorage.removeItem('ultimoValorBuscado');
    localStorage.removeItem('historico');
  };

  // Retorna máscara de input com base no tipo
  const getMask = () => {
    switch (tipoSelecionado) {
      case 'cpf': return '999.999.999-99';
      case 'cnpj': return '99.999.999/9999-99';
      case 'telefone': return '(99) 99999-9999';
      default: return null;
    }
  };

  // Renderiza o campo de input com ou sem máscara
  const renderInput = (field: ControllerRenderProps<SearchSchema, 'valor'>) => {
    const inputProps = {
      ...field,
      placeholder: 'Digite o valor',
      className: errors.valor ? 'p-invalid' : '',
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }
      }
    };
    return getMask()
      ? <InputMask {...inputProps} mask={getMask() as string} />
      : <InputText {...inputProps} />;
  };

  return (
    <Container>
      <FormSection>
        <BlockTitle
          t1="Consulta de Dados Básicos"
          t2="Encontre as informações essenciais de seus investigados"
        />
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <InputsRow>
            <LabelGroup>
              <label>Tipo</label>
              <Controller
                name="tipoDeBusca"
                control={control}
                render={({ field }) => (
                  <select {...field}>
                    {TIPOS_BUSCA.map(tipo => (
                      <option key={tipo} value={tipo}>{tipo.toUpperCase()}</option>
                    ))}
                  </select>
                )}
              />
            </LabelGroup>

            <LabelGroup>
              <label>Valor</label>
              <Controller
                name="valor"
                control={control}
                render={({ field }) => renderInput(field)}
              />
              {errors.valor && <ErrorText>{errors.valor.message}</ErrorText>}
            </LabelGroup>

            <Button type="submit">Pesquisar</Button>
            <Button
              type="button"
              onClick={handleClear}
              style={{ backgroundColor: '#ccc', color: '#000' }}
            >
              Limpar
            </Button>
          </InputsRow>
        </FormWrapper>
      </FormSection>
    </Container>
  );
};
