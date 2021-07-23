# <p align="center">TechSup v1.0</p>


### 📋 Sobre o projeto

TechSup foi um sistema desenvolvido durante um dos treinamentos realizados online. A proposta da aplicação é ajudar quem precisa fazer o registro de chamados e solicitações de clientes e organizar melhor os trabalhos que precisam ser realizados durante o dia pelo usuário da aplicação.

***

### 💻 Tecnologias Utilizadas

* React
* JavaScript
* Firebase
* SASS

***

### <p align="center">💡 Dando inicio ao Projeto e organizando Rotas</p>

Começamos então criando a estrutura do nosso projeto com o template simples do React.

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


### <p align="center">💡 Configurando Firebase e o Context API</p>

Terminando de configurar nossas rotas e deixando tudo pronto, agora precisamos conectar o sistema com nosso banco de dados que nesse projeto vai ser o Firebase.
Vamos criar uma pasta services dentro da nossa pasta src e criar um arquivo chamado firebaseConnection.js que vai fazer a nossa conexão com o banco de dados.

![image](https://user-images.githubusercontent.com/67201210/126529158-a0d5d2e1-f89b-4524-b5cb-eb56ce97a4bc.png)

Com nosso Banco criado vamos criar uma API Context que será a API que vai ter todas as informações do usuário logado, pois vamos precisar ter essas informações em várias partes da nossa aplicação então vamos criar uma totalmente do zero. Na pasta contexts vamos criar o nosso user.js, e importar o que vamos utilizar na nossa API Context.
OBS: Vamos utilizar uma biblioteca que vai ser os nossos 'alertas' de sucesso, falha, aviso, etc...

    npm install toastify

![image](https://user-images.githubusercontent.com/67201210/126543674-4a0e7c21-9d2d-40e7-9f6b-fcbe73f89989.png)

Na raíz do nosso projeto (App.js) vamos configurar também o toastify

![image](https://user-images.githubusercontent.com/67201210/126544535-3d54d332-f39a-43e5-89a7-ee973a8e330f.png)

Agora vamos configurar todo o nosso contexto criar as funções para logar, cadastrar, deslogar e salvar o usuário no nosso localStorage, para que o usuário não precise logar toda vez que for acessar a aplicação, também vamos criar nossas states que vão ser variáveis que vão sofrer alterações durante a executação do nosso código e também armazenar as informações.

![image](https://user-images.githubusercontent.com/67201210/126546613-865493ec-4c4b-41d5-9369-bb21f2408519.png)

Após isso, vamos dar um return e passar o nosso AuthContext como tag com o (.provider), que vai prover as nossas funções e configurações para os outros componentes do nosso sistema, passando como value nossas funções e váriaveis que os outros componentes da nossa aplicação vão ter acesso. Lembrando também de passar o (children) para ter acesso ao conteúdo dentro do contexto criado. E por último vamos exportar nossa API Context

![image](https://user-images.githubusercontent.com/67201210/126546755-411c2479-bc8e-4ae2-b410-70fa2ced1de0.png)

OBS: As configurações e funções criadas feitas para o funcionamento do sistema estão no (user.js) dentro da pasta contexts. O código está comentado e bem detalhado para verificar como está sendo estruturada cada função.

### <p align="center">💡 Configurando a tela de Login</p>

Iniciando com a tela de Login, vamos precisar primeiramente de alguns icones para colocar no layout para isso vamos utilizar uma biblioteca do React. Para colocarmos a biblioteca na nossa aplicação vamos instalar ela com o npm.

    npm install react-icons
    
Agora vamos importar o que vamos utilizar na tela de Login, no caso precisamos do nosso estilo, ícones que foram escolhidos para esse projeto, useState para guardarmos e fazermos a autenticação das informações de login (email e senha), o Link do React router dom, useContext para utilizarmos algumas informações da nossa API Context e por fim a nossa API.

![image](https://user-images.githubusercontent.com/67201210/126695897-634827c5-7356-47c7-9031-aff2c932f3da.png)

Com nossas importações feitas, criaremos as nossas states e importamos também as informações que vamos utilizar da nossa API.

![image](https://user-images.githubusercontent.com/67201210/126696369-7ddf56bb-e983-4ae7-9ee6-e9504afa3346.png)

Iremos estruturar agora o nosso HTML e CSS do layout da tela de login. Após a estruturação utilizaremos a função onSubmit para quando o usuário tentar logar, disparar uma função que no caso vai ser a função que vamos criar logo a cima e passar ela no nosso onSubmit. Os ícones vamos utilizar como tags por exemplo <AiTwotoneLock />, passando as propriedades. Logo embaixo dos campos vamos utilizar o Link do React router dom, para mandar o usuário para a tela de cadastrar conta caso ele não tiver uma, e embaixo no botão de acessar vamos colocar um operador ternário com o nosso loadingAuth para monitorar se o usuário está tentando fazer login ou não, e trocar a mensagem do botão dinamicamente.

![image](https://user-images.githubusercontent.com/67201210/126701767-51273d83-36ab-41e7-bc61-c8f775a9f2cc.png)















