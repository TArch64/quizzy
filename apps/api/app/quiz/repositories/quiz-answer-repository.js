import {Repository} from "../../core/repository.js";
import {DataTypes} from "sequelize";

export class QuizAnswerRepository extends Repository {
    name = 'QuizAnswer';

    schema = {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        questionId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };

    relations({ questions }) {
        this.db.belongsTo(questions.db);
    }
}
