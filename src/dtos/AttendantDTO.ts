export interface AttendantDTO {
  Cadastro: {
    Codigo: number;
    Foto: string;
    Link: string;
    Nome: string;
    Nota: number;
    Status: string;
  };
  FormasAtt: {
    Chat: string;
    Telefone: string;
    Video: string;
    Email?: string;
  };
  ValorPorMinuto: number;
}
