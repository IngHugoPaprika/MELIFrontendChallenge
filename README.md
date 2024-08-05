# MELI Front-end technical challenge

Este proyecto fue construido para cumplir con los requerimientos solicitados en el challenge técnico de Front-end para Mercado Libre.
Proyecto terminado el 04/08/2024.
Autor: Ing. Hugo Nelson Paprika. 

## Clonación de repositorio

Para clonar el repositorio del presente projecto, desde una terminal se debe correr el comando
'git clone https://github.com/IngHugoPaprika/MELIFrontendChallenge.git'

## Dependencias

Stack tecnológico utilizado:

> React ^18.3.1
> react-router-dom ^6.26.0
> Node
> Express ^4.19.2
> Axios ^1.7.3
> Sass ^1.77.8

Para instalar las dependencias es recomendado entrar a cada carpeta de espectro e instalar las dependencias desde allí.
Al correr el sistema, pueden haber dependencias que no se hayan instalado junto con las demás.

### Front-end

'cd client'
'npm install'
(Ante la duda, correr también 'npm install react-router-dom', 'npm install sass' y 'npm install axios' 
ya que pueden no instalarse por default)

### Back-end
'cd server'
'npm install'

## Scrips de ejecución

Para correr el sistema se recomienda tener dos terminales abiertas para correr el front-end y el back-end.

En una terminal correr:

    'cd client'
    'npm start' (Para correr el frontend en modo development y así poder probar vista desktop y vista mobile)

En la siguiente terminal correr:

    'cd server'
    'node app.js'