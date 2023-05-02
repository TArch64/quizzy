import {Repository} from "../../core/repository.js";
import {DataTypes} from "sequelize";

export class QuizQuestionRepository extends Repository {
    name = 'QuizQuestion';

    schema = {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        quizId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        correct: {
            type: DataTypes.UUID,
            allowNull: false
        }
    };

    relations({ quizzes, answers }) {
        this.db.belongsTo(quizzes.db);

        this.db.hasMany(answers.db, {
            foreignKey: 'questionId',
            onDelete: 'CASCADE'
        });
    }
}
