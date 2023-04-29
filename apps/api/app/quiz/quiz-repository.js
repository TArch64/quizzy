import {Repository} from "../core/repository.js";
import {DataTypes} from "sequelize";

export class QuizRepository extends Repository {
    name = 'Quiz';

    schema = {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };

    findById(id) {
        return this.db.findByPk(id);
    }

    create(data) {
        return this.db.create(data);
    }
}
