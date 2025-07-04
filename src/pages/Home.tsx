import { useState } from 'react';
import { SearchForm } from '../components/BlockForm/SearchForm';
import { Resultados } from '../components/BlockForm/Resultados';
import type { Entidade } from '../types/Entidade';
import { Header } from '../components/header/Index';
import { GlobalStyle } from '../GlobalStyles';
import type { TipoDeBusca } from '../types/Global';

export const Home = () => {
  const [historico, setHistorico] = useState<Entidade[]>([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [tipoBuscaSelecionado, setTipoBuscaSelecionado] = useState<TipoDeBusca>('cpf');
  const [valorBuscado, setValorBuscado] = useState(''); 

  return (
    <>
      <GlobalStyle />
      <Header />
      <SearchForm
        setHistorico={setHistorico}
        setLoading={setLoading}
        setNoResults={setNoResults}
        setTipoBuscaSelecionado={setTipoBuscaSelecionado}
        setValorBuscado={setValorBuscado}   
      />
      <Resultados
        historico={historico}
        loading={loading}
        noResults={noResults}
        tipoBuscaSelecionado={tipoBuscaSelecionado}
        valorBuscado={valorBuscado}     
      />
    </>
  );
};

