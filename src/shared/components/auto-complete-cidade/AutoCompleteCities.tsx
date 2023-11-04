import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { CidadesService } from '../../services/api/cidades/CidadesService';
import { useDebounce } from '../../hooks';
import { useField } from '@unform/core';

type TAutoCompleteOption = {
  id: number;
  label: string;
}
interface IAutoCompleteCitiesProps {
  isExternalLoading?: boolean;
}

export const AutoCompleteCities: React.FC<IAutoCompleteCitiesProps> = ({ isExternalLoading = false }) => {
  const { registerField, fieldName, defaultValue, error, clearError } = useField('cidadeId');

  const [ selectedId, setSelectedId ] = useState<number | undefined>(defaultValue);

  const [ options, setOptions ] = useState<TAutoCompleteOption[]>([]);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ search, setSearch ] = useState<string>('');

  const { debounce } = useDebounce();

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
    });
  }, [registerField, fieldName, selectedId]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CidadesService.getAll(1, search)
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            // alert(result.message);
          } else {
            setOptions(result.data.map(({id, nome}) => ({ id: id, label: nome })));
          }
        });
    });
  }, [search]);

  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return null;

    const selectedOption = options.find(option => option.id === selectedId);

    return selectedOption;
  }, [selectedId, options]);

  return (
    <Autocomplete 
      openText='Abrir'
      closeText='Fechar'
      noOptionsText='Sem opções'
      loadingText='Carregando...'

      disablePortal

      options={options}
      loading={isLoading}
      disabled={isExternalLoading}
      value={autoCompleteSelectedOption}
      onInputChange={(_, newValue) => setSearch(newValue)}
      popupIcon={(isExternalLoading || isLoading) ? <CircularProgress size={28}/> : undefined}
      onChange={(_, newValue) => { setSelectedId(newValue?.id); setSearch(''); clearError();}}

      renderInput={(params) => 
        <TextField 
          {...params}

          label='Cidade'
          error={!!error}
          helperText={error}
        />
      }
    />
  );
};