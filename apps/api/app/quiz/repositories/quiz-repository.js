import {Repository} from "../../core/repository.js";
import {DataTypes} from "sequelize";

export class QuizRepository extends Repository {
    name = 'Quiz';

    schema = {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        }
    };

    relations({ questions }) {
        this.db.hasMany(questions.db, {
            foreignKey: 'quizId',
            onDelete: 'CASCADE'
        });
    }
}
