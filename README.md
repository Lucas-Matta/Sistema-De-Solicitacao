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

Vamo dar um return com o nosso Route e passar nossas propriedades e componentes que configuramos logo a cima.

![image](https://user-images.githubusercontent.com/67201210/126395981-11270937-0465-459f-8c21-004fd94adade.png)

Agora na configuração do index importamos nosso Switch e Route que configuramos anteriormente, juntamente com as páginas que criamos de login, cadastro e dashboard. Lemb rando que a página de dashboard o usuário só poderá acessar se estiver logado no sistema então vamos colocar ela privada com o comando isPrivate, também do react router dom.

![image](https://user-images.githubusercontent.com/67201210/126396432-1eff1000-7e1b-4ffd-94fb-181518da197e.png)

E vamos também configurar na página raíz do nosso projeto o App.js as nossas rotas, e também o nosso estilo global da nossa aplicação.

![image](https://user-images.githubusercontent.com/67201210/126398193-0dbbb8c2-c6a0-4ea5-9246-949f943f7a7b.png)


### 💡 Configurando Firebase e o Context API

Terminando de configurar nossas rotas e deixando tudo pronto, agora precisamos conectar o sistema com nosso banco de dados que nesse projeto vai ser o Firebase.
Vamos criar uma pasta services dentro da nossa pasta src e criar um arquivo chamado firebaseConnection.js que vai fazer a nossa conexão com o banco de dados.

![image](https://user-images.githubusercontent.com/67201210/126400473-dbd0ed8f-3337-49a4-9255-010e39f67298.png)





