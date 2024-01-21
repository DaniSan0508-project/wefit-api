import  swaggerJSDoc from 'swagger-jsdoc';
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API de Perfil pessoa Fisica/Juridica',
      description: 'API para criar e buscar perfis de pessoas físicas e jurídicas',
      version: '1.0.0',
    },
  },
  apis: ['./src/server/routes/*.ts'], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
