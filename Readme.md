RabitMQ

docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.9-management

durable true

permite tener frente a interrupciones la continuida de que el consumer tenga los datos.

persist

permite mantener la cola de mensajes frente a un reinicio del rabitmq

