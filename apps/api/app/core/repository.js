export class Repository {
    static create(sequelize) {
        const repository = new this();
        repository.init(sequelize);
        return repository;
    }

    name;
    schema;
    #db;
    #sequelize;

    relations() {};

    init(sequelize) {
        this.#sequelize = sequelize;
        this.#db = sequelize.define(this.name, this.schema);
    }

    get db() {
        return this.#db;
    }

    startTransaction() {
        return this.#sequelize.transaction();
    }

    findById(id) {
        return this.#db.findByPk(id);
    }

    create(data, options = {}) {
        return this.#db.create(data, options);
    }

    bulkCreate(data, options) {
        return this.#db.bulkCreate(data, options);
    }

    build(data) {
        return this.#db.build(data);
    }
}
