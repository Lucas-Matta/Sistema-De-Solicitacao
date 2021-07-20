# <p align="center">TechSup v1.0</p>


### 📋 Sobre o projeto

TechSup foi um sistema desenvolvido durante um dos treinamentos realizados online. A proposta da aplicação é ajudar quem precisa fazer o registro de chamados e solicitações de clientes e organizar melhor os trabalhos que precisam ser realizados durante o dia pelo usuário da aplicação.

***

### 💻 Tecnologias Utilizadas

* React
* JavaScript
* Firebase
* SCSS

***

### 💡 Dando inicio ao Projeto e organizando Rotas

Começamos então criando a estrtura do nosso projeto com o template simples do React.

    npm create-react-app nameproject
    
Agora vamos criar a estrutura das nossas Rotas da aplicação, pois vamos adicionar um sistema de Login e cadastramento de conta para a segurança do usuário. Para isso iremos utilizar o próprio sistema de rotas do React (React Router Dom).

    npm install react-router-dom
    
Iremos criar uma página chamada routes e criar dois arquivos o index.js que será o responsável por gerenciar todas as nossas rotas do sistema, e o Route.js que será as nossas configurações particulares do sistema de rota do React.

![image](https://user-images.githubusercontent.com/67201210/126382796-554155f6-172e-4938-9922-7ff632e3f7fe.png)

Vamos começar importando o Route e Redirect do react router dom, e também criar a função que vai ser responsável por receber os nossos componentes e algumas configurações necessárias para criarmos as regras necessárias no nosso sistema de rotas.

![image](https://user-images.githubusercontent.com/67201210/126386940-8698b184-4feb-460d-9e47-92617444d598.png)

Agora com a função criada e as importações necessárias para criar as regras das rotas, iremos configurar as permissões e regras. Primeiramente iremos definir duas variáveis que vão ser nomeadas de signed (vai ser responsável por dizer se o usuário está logado) e loading (vai ser responsável por verificar o carregamento da página).
E vamos definir nossas regras através do if utilizando essas variáveis.

OBS: Vamos colocar essas variáveis dinamicas quando criarmos nosso useContext.

![image](https://user-images.githubusercontent.com/67201210/126395413-1a0e9c87-804d-448a-a307-0e6bee6c98f6.png)









