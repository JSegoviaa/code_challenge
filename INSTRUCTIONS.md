# Code Challenge - Fullstack

## Instrucciones

### Para correr el proyecto localmente hay que seguir los siguientes pasos

1. Clonar el repositorio


```
https://github.com/JSegoviaa/code_challenge
```


2. Levantar la base de datos:

```
$ cd backend 

$ docker comopse up -d

$ python seed.py
```
Esto te posiciona sobre el backend, levanta la base de datos localmente y ejecuta el seed para llenar la base de datos



3. Levantar en modo desarrollo el backend




```
$ python -m venv venv

$ source/venv/Scripts/activate

$ pip install -r requirements

$ fastapi dev app/main.py

```

Esto crea un entorno virtual, instala las librerías que necesita y se ejecuta en modo local el backend


4. Levantar el frontend en modo desarrollo

Primero tenemos que crear un archivo .env dentro de la carpeta frontend. Copiamos y pegamos lo que tiene .env.example
Luego ejecutamos los siguientes comandos:

```
$ cd ../frontend

$ npm install

$ npm run dev
```


Una vez hecho los siguientes pasos podemos abrir la dirección que aparece en consola:

``http://localhost:5173/``
