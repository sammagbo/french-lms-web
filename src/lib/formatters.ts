import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatPrice = (value: number) => {
      return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
      }).format(value);
};

export const formatDate = (date: Date | string) => {
      const d = typeof date === 'string' ? new Date(date) : date;
      return format(d, "dd/MM/yyyy", { locale: ptBR });
};
