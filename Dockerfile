FROM public.ecr.aws/lambda/nodejs:18 AS builder

WORKDIR /usr/app

COPY package.json ./
COPY tsconfig.json ./
COPY .eslintrc.cjs ./
COPY src/ src/

RUN npm install
RUN npm run build

FROM public.ecr.aws/lambda/nodejs:18

WORKDIR ${LAMBDA_TASK_ROOT}

COPY --from=builder /usr/app/dist/* ./

CMD ["index.handler"]
