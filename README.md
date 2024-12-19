<div style="text-align: center;">
    <svg width="200px" height="200px" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"
    ><defs><linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="Arch_AWS-Lambda_32_svg__a"><stop stop-color="#C8511B" offset="0%"></stop><stop stop-color="#F90" offset="100%"></stop></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M0 0h40v40H0z" fill="url(#Arch_AWS-Lambda_32_svg__a)"></path><path d="M14.386 33H8.27l6.763-14.426 3.064 6.44L14.387 33zm1.085-15.798a.49.49 0 00-.442-.282h-.002a.493.493 0 00-.441.285l-7.538 16.08a.507.507 0 00.028.482c.09.145.247.233.415.233h7.206c.19 0 .363-.111.445-.286l3.944-8.489a.508.508 0 00-.002-.432l-3.613-7.591zM32.018 33h-5.882l-9.47-20.711a.491.491 0 00-.444-.289H12.37l.005-5h7.549l9.424 20.71c.08.177.256.29.446.29h2.224v5zm.49-6h-2.4L20.684 6.29a.492.492 0 00-.446-.29h-8.353a.496.496 0 00-.491.5l-.006 6c0 .132.052.259.144.354a.488.488 0 00.347.146h4.032l9.468 20.711c.08.176.254.289.445.289h6.686a.495.495 0 00.491-.5v-6c0-.276-.219-.5-.491-.5z" fill="#FFF"></path></g></svg>
</div>

# AWS Lambda

Função AWS Lambda.

## Índice

- [AWS Lambda](#aws-lambda)
  - [Índice](#índice)
  - [1. Iniciando](#1-iniciando)
  - [2. Testando Funções Lambda Localmente](#2-testando-funções-lambda-localmente)

## 1. Iniciando

Função AWS Lambda.

Suas principais dependências são:

- Node.Js (v18.19.1) - motor de execução javascript;
- Docker (v26.0.0) - ambiente de testes local para funções lambda.

Para fazer o setup do projeto localmente, tenha instalado: o git, uma conexão via ssh com o github, o nvm, o node na versão v18.19.1, o npm na versão v10.2.4 e o docker na versão v26.0.0.

**Setup Linux:**

```shell
    # Navegue até o diretório do projeto.
    cd aws-lambda

    # Ative o ambiente node na versão necessária. Ela será automaticamente inferida a partir do arquivo .nvmrc contido no projeto.
    nvm use

    # Instale as dependências do projeto.
    npm i

    # Copie e renomeie o arquivo de variáveis de ambiente
    cp .env.example .env
```

Após isso você já terá um ambiente de desenvolvimento pronto para o uso.

## 2. Testando Funções Lambda Localmente

Para realizar o teste local de funções lambda será utilizada uma imagem Docker distribuida pela AWS, que contém a interface de execução (runtime) da AWS Lambda. Essa imagem é utilizada para simular o ambiente de execução de funções lambda em um ambiente local.

**Setup Linux:**

Comece construindo a imagem docker que contém a função lambda a ser executada junto ao *AWS Lambda Runtime Interface Emulator* (RCI). Na raiz do projeto existe um Dockerfile que se encarregará de fazer esse setup, então execute o comando:

```shell
  # Substitua o nome da função e da tag que deseja dar para a imagem
  docker build --platform linux/amd64 -t <nome_Da_funcao>:<tag_da_imagem> .
```

Após isso basta executar o container docker previamente construído com:

```shell
  # Substitua o nome da função e a tag da imagem
  # Substitua o nome do conainter
  # Substitua o nome do arquivo com as variáveis de ambiente
  docker run --name <nome_do_container> --platform linux/amd64 --env-file <variaveis_de_ambiente> -p 9000:8080 <nome_Da_funcao>:<tag_da_imagem>
```

>[!NOTE]
> Variáveis de ambiente podem ser passadas individualmente para o container no formato `-e VARIAVEL=VALOR` ou através de um arquivo no formato `--env-file ARQUIVO`. É recomendado o uso do arquivo .env para esse fim.

Após rodar o comando você verá em seu terminal os logs do servidor RCI e já terá tudo pronto para a execução de testes.

**Invocando a Função Lambda:**

A função lambda que existe dentro do container recentemente criado pode ser invocada pelo o endpoint `http://localhost:9000/2015-03-31/functions/function/invocations`, utilizando qualquer cliente http que consiga transmitir corpos de requisição no formato JSON. Aqui um exemplo utilizando o `curl`:

```shell
  # Neste caso o corpo da requisição é um objeto JSON vazio
  curl "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{}'
```

Outros clientes como postman, insomnia ou mesmo webhooks também podem ser utilizados.

**Referências:**

Mais a respeito da imagem docker utilizada, processo de testes, configurações de ambiente de execução e das limitações de testes em ambiente local podem ser econtradas nos links:

- [Typescript Lambda](https://docs.aws.amazon.com/lambda/latest/dg/typescript-handler.html)

- [Testando Lambdas Localmente](https://docs.aws.amazon.com/lambda/latest/dg/images-test.html)

- [AWS Lambda Runtime Interface Emulator](https://github.com/aws/aws-lambda-runtime-interface-emulator/)

- [AWS Lambda Environment Variables](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html)

- [Localstack](https://github.com/localstack/localstack)
