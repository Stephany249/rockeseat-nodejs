# **Mapeando o domínio**

## **Entidades de Domínio**

### **Produto**
Cada item individual mantido no estoque, com os seguintes atributos:
- Número de identificação único (ID)
- Nome
- Descrição
- Tamanho
- Preço
- Cor

### **Estoque**
O conjunto de todos os produtos mantidos pela empresa em um determinado momento, com informações sobre quantidades disponíveis e histórico de movimentações.

### **Venda**
Transações que envolvem a venda de produtos, registrando detalhes como produtos vendidos, quantidades, datas e valores.

### **Ordem de Compra**
Requisições para comprar produtos, geradas com base em quantidades mínimas de estoque e tendências de vendas.

### **Fornecedor**
Entidades externas que fornecem produtos à empresa, com informações sobre produtos, preços e prazos de entrega.

## **Casos de Uso**

### **Rastreamento de Produto**
- Permitir a atribuição de números de identificação únicos a cada produto e o registro de informações adicionais como tamanho e cor.

### **Definição de Quantidades Mínimas de Estoque**
- Permitir que os usuários definam limites mínimos de estoque para cada produto.

### **Recebimento de Alertas de Estoque Baixo**
- Enviar alertas por e-mail e notificações no sistema quando os níveis de estoque estiverem próximos dos limites mínimos definidos.

### **Visualização de Histórico de Vendas e Estoque**
- Permitir que os usuários vejam informações detalhadas sobre vendas, lucros por produto e tendências de estoque ao longo do tempo, por meio de gráficos ou relatórios.

### **Criação e Gerenciamento de Ordens de Compra**
- Automatizar o processo de geração e gerenciamento de ordens de compra com base nas quantidades mínimas de estoque e nas tendências de vendas.

### **Integração com Fornecedores**
- Permitir a integração com os sistemas dos fornecedores para receber atualizações automáticas sobre preços, prazos de entrega de novas remessas.