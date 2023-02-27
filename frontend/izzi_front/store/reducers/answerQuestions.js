import {GET_ANSWER_QUESTION} from '../constants/constants'

const initialState = {
    AnswerQuestionitems: [],
    isLoaded: false,
};

const answerQuestion = (state = initialState, action) => {
    switch (action.type) {
        case GET_ANSWER_QUESTION:
            return {
                ...state,
                AnswerQuestionitems: action.payload,
                isLoaded: true,
            };
        case "SET_LOADED":
            return {
                ...state,
                isLoaded: action.payload,
            };

        default:
            return state;
    }
};

export default answerQuestion;
