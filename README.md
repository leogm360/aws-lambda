<p align="center">
  <img
    src="./assets/lambda.svg"
    width="200px"
    height="200px"
    alt="lambda-function"
  />
</p>

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

**Integrando com Outros Serviços:**

Para integrar a função lambda com outros serviços da AWS, considere utilizar o Localstack. O Localstack é uma ferramenta que simula o ambiente da AWS em um ambiente local, permitindo a execução de serviços como S3, SQS, SNS, DynamoDB, entre outros. Para mais informações sobre o Localstack, acesse o [repositório oficial](https://github.com/localstack/localstack).

O repositorio contém um arquivo `docker-compose.yml` que pode ser utilizado para subir um ambiente local com o Localstack e o container da função lambda. Para subir o ambiente, execute o comando:

```shell
  docker-compose up
```

**Referências:**

Mais a respeito da imagem docker utilizada, processo de testes, configurações de ambiente de execução e das limitações de testes em ambiente local podem ser econtradas nos links:

- [Typescript Lambda](https://docs.aws.amazon.com/lambda/latest/dg/typescript-handler.html)

- [Testando Lambdas Localmente](https://docs.aws.amazon.com/lambda/latest/dg/images-test.html)

- [AWS Lambda Runtime Interface Emulator](https://github.com/aws/aws-lambda-runtime-interface-emulator/)

- [AWS Lambda Environment Variables](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html)

- [Localstack](https://github.com/localstack/localstack)
