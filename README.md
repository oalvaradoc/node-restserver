# Notas de Web Server

1. Pruebas

npm install para instalar las llibrerias


2. Publicar 

git push heroku main

3. Quitar el segumiento de un documento en git

git rm .env --cached

4. Para ver las variables de entorno de heroki

heroku config

5. Establecer una nueva variable de entorno 

heroku config:set nombre="Omar Alvarado"

6. Borrar una nueva variable de entorno 

heroku config:unset nombre

7. Ver terminal del produccion con los logs
    7.1 heroku logs -n 100 [Ultimos 100 Logs]
    7.2 heroku logs -n tail [Todos los Logs]