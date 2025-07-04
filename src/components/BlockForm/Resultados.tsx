import { useEffect, useState } from 'react';
import { Button } from './searchFormStyles'; 
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import type { Entidade } from '../../types/Entidade';
import { ResultWrapper, Titulo, Texto, DialogContent, ModalOverlay, ModalContainer } from './searchFormStyles';
import type { TipoDeBusca } from '../../types/Global';

type Props = {
  historico: Entidade[];
  loading: boolean;
  noResults: boolean;
  tipoBuscaSelecionado: TipoDeBusca;
  valorBuscado: string;
};

type FiltroTipo = 'ambos' | 'pessoa' | 'empresa';

export const Resultados = ({ historico, loading, noResults, tipoBuscaSelecionado }: Props) => {
  const [selecionado, setSelecionado] = useState<Entidade | null>(null);
  const [visible, setVisible] = useState(false);

  const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>('ambos');

  // Estado para guardar o valor buscado que será exibido na tabela
  const [valorBuscado, setValorBuscado] = useState('');
  // Estado para guardar o tipo da busca que está sendo exibido
  const [tipoBusca, setTipoBusca] = useState<TipoDeBusca>('cpf');

  // useEffect que atualiza o valorBuscado e tipoBusca sempre que
  // o histórico ou o tipo de busca selecionado forem alterados
  useEffect(() => {
    if (historico.length === 0) {
      setValorBuscado('');
      return;
    }

    // Pegamos o primeiro item do histórico como o último valor buscado
    const ultimo = historico[0];

    let valor = '';

    switch (tipoBuscaSelecionado) {
      case 'telefone':
        valor = ultimo.telefones?.[0] || '';
        break;
      case 'email':
        valor = ultimo.emails?.[0] || '';
        break;
      case 'endereco':
        valor = ultimo.enderecos?.[0] || '';
        break;
      case 'cpf':
        valor = ultimo.tipo === 'pessoa' ? ultimo.cpf || '' : '';
        break;
      case 'cnpj':
        valor = ultimo.tipo === 'empresa' ? ultimo.cnpj || '' : '';
        break;
      case 'nome':
        valor = ultimo.nome || '';
        break;
      default:
        valor = '';
    }

    setValorBuscado(valor);
    setTipoBusca(tipoBuscaSelecionado);
  }, [historico, tipoBuscaSelecionado]);

  const abrirModal = (item: Entidade) => {
    setSelecionado(item);
    setVisible(true);
  };

  const fecharModal = () => {
    setVisible(false);
    setSelecionado(null);
  };

  const documentoBody = (row: Entidade) => {
    return row.tipo === 'pessoa' ? row.cpf : row.tipo === 'empresa' ? row.cnpj : '-';
  };

  const valorBuscaBody = (row: Entidade) => {
    switch (tipoBusca) {
      case 'telefone':
        return row.telefones.length > 0 ? row.telefones[0] : '-';
      case 'email':
        return row.emails.length > 0 ? row.emails[0] : '-';
      case 'endereco':
        return row.enderecos.length > 0 ? row.enderecos[0] : '-';
      case 'cpf':
        return row.tipo === 'pessoa' ? row.cpf : '-';
      case 'cnpj':
        return row.tipo === 'empresa' ? row.cnpj : '-';
      case 'nome':
        return row.nome;
      default:
        return valorBuscado || '-';
    }
  };

  // Filtra o histórico conforme o filtroTipo
  const dadosParaExibir = historico.filter(entidade => {
    if (filtroTipo === 'ambos') return true;
    return entidade.tipo === filtroTipo;
  });

  return (
    <ResultWrapper>
      {loading && <Texto>Carregando...</Texto>}

      {noResults && <Texto>Nenhum resultado encontrado.</Texto>}

      {!loading && dadosParaExibir.length > 0 && (
        <>
          <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
            <label htmlFor="filtroTipo" style={{ marginRight: '0.5rem' }}>Filtrar por tipo:</label>
            <select
              id="filtroTipo"
              value={filtroTipo}
              onChange={e => setFiltroTipo(e.target.value as FiltroTipo)}
              style={{ padding: '0.25rem 0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
            >
              <option value="ambos">Ambos</option>
              <option value="pessoa">Pessoas</option>
              <option value="empresa">Empresas</option>
            </select>
          </div>

          <Titulo>Resultados Recentes</Titulo>
          <DataTable value={dadosParaExibir} paginator rows={10}>
            <Column field="nome" header="Nome" sortable />
            <Column field="tipo" header="Tipo" sortable />
            <Column header="Documento" body={documentoBody} />
            <Column header="Valor Buscado" body={valorBuscaBody} />
            <Column
              header="Ações"
              body={(rowData: Entidade) => (
                <Button onClick={() => abrirModal(rowData)}>Detalhes</Button>
              )}
            />
          </DataTable>
        </>
      )}

      {!loading && dadosParaExibir.length === 0 && !noResults && (
        <Texto>Nenhum resultado a mostrar.</Texto>
      )}

      <ModalOverlay visible={visible} onClick={fecharModal}>
        <ModalContainer onClick={e => e.stopPropagation()}>
          {selecionado && (
            <DialogContent>
              <p><b>Nome:</b> {selecionado.nome}</p>
              <p><b>Tipo:</b> {selecionado.tipo}</p>

              {selecionado.tipo === 'pessoa' && (
                <>
                  <p><b>CPF:</b> {selecionado.cpf}</p>
                  <p><b>Sexo:</b> {selecionado.sexo}</p>
                  <p><b>Data de Nascimento:</b> {selecionado.dataNascimento}</p>
                  <p><b>Nome da Mãe:</b> {selecionado.nomeMae}</p>
                </>
              )}

              {selecionado.tipo === 'empresa' && (
                <>
                  <p><b>CNPJ:</b> {selecionado.cnpj}</p>
                  <p><b>Capital Social:</b> {selecionado.capitalSocial}</p>
                  <p><b>Data de Início:</b> {selecionado.dataInicio}</p>
                  <p><b>Situação:</b> {selecionado.situacaoCadastral}</p>
                  <p><b>CNAE:</b> {selecionado.cnae}</p>
                  <p><b>Sócios:</b> {selecionado.socios.join(', ')}</p>
                </>
              )}

              <p><b>Telefones:</b> {selecionado.telefones.join(', ')}</p>
              <p><b>Emails:</b> {selecionado.emails.join(', ')}</p>
              <p><b>Endereços:</b> {selecionado.enderecos.join('; ')}</p>

              <Button onClick={fecharModal} style={{ marginTop: '1.5rem' }}>Fechar</Button>
            </DialogContent>
          )}
        </ModalContainer>
      </ModalOverlay>
    </ResultWrapper>
  );
};