export class Repository {
    static create(sequelize) {
        const repository = new this();
        repository.db = sequelize.define(repository.name, repository.schema);
        return repository;
    }

    name;
    schema;
    db;
}
