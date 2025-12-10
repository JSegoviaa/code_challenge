# Code Challenge - Fullstack

## Instrucciones

### Para correr el proyecto localmente hay que seguir los siguientes pasos

1. Clonar el repositorio


```
https://github.com/JSegoviaa/code_challenge
```

2. Crear un .env dentro del directorio backend y copiar lo que tiene .env.example


3. Abrimos una terminal en el directorio del proyecto y procedemos a levantar la base de datos:

```
$ cd backend 

$ docker comopse up -d

```
Esto te posiciona sobre el backend, levanta la base de datos localmente



4. Levantar en modo desarrollo el backend




```
$ python -m venv venv

$ source venv/Scripts/activate

$ pip install -r requirements

$ python seed.py

$ fastapi dev app/main.py

```

Esto crea un entorno virtual, instala las librerías que necesita y se ejecuta en modo local el backend


5. Levantar el frontend en modo desarrollo

Abrimos una terminal sobre el directorio frontend.
Primero tenemos que crear un archivo .env dentro de la carpeta frontend. Copiamos y pegamos lo que tiene .env.example
Luego ejecutamos los siguientes comandos:

```
$ npm install

$ npm run dev
```


Una vez hecho los siguientes pasos podemos abrir la dirección que aparece en consola:

``http://localhost:5173/``
