FROM mongo:8.0.3

ENV MONGO_REPLICA_PORT 27017
ENV MONGO_REPLICA_HOST localhost

CMD mongod --port $MONGO_REPLICA_PORT --replSet rs0 --bind_ip 0.0.0.0 & MONGOD_PID=$!; \
    # preparamos o conjunto de réplicas com um único nó e preparamos a configuração do usuário root
    INIT_REPL_CMD="rs.initiate({ _id: 'rs0', members: [{ _id: 0, host: '$MONGO_REPLICA_HOST:$MONGO_REPLICA_PORT' }] });"; \
    INIT_USER_CMD="db.getSiblingDB('admin').getUser('$MONGO_INITDB_ROOT_USERNAME') || db.getSiblingDB('admin').createUser({ user: '$MONGO_INITDB_ROOT_USERNAME', pwd: '$MONGO_INITDB_ROOT_PASSWORD', roles: [ 'root' ] });"; \
    # esperamos que o conjunto de réplicas esteja pronto e então enviamos os comandos acima
    until mongosh --port $MONGO_REPLICA_PORT --eval "$INIT_REPL_CMD" 2>&1 | grep -q "MongoServerError: already initialized"; do sleep 1; done; \
    # terminamos, mas mantemos o contêiner esperando os sinais da tarefa mongo
    echo "REPLICA SET ONLINE" && mongosh --port $MONGO_REPLICA_PORT --eval "$INIT_USER_CMD"; wait $MONGOD_PID; \