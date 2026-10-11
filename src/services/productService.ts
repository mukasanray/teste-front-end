import type { Product } from '../types/Product';

const API_URL =
  '/api/teste-front-end/junior/tecnologia/lista-produtos/produtos.json';

interface ApiResponse {
  success: boolean;
  products: Product[];
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Erro HTTP ' + response.status);
  }

  const data: ApiResponse = await response.json();

  if (!data.success || !Array.isArray(data.products)) {
    throw new Error('Resposta inesperada da API.');
  }

  return data.products;
}
