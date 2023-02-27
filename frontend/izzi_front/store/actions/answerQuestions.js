import {GET_ANSWER_QUESTION} from '../constants/constants'
import izzi from "../../adapters/axios.config";

export const setLoaded = (payload) => ({
    type: "SET_LOADED",
    payload,
});
export const getAnswerQuestion = (AnswerQuestionitems) => ({
    type: GET_ANSWER_QUESTION,
    payload: AnswerQuestionitems,
});

export const fetchAnswerQuestion = () => (dispatch) => {
    dispatch(setLoaded());
    try {
        izzi
            .get(`/info/footer-faq/`)
            .then(({ data }) => {
                dispatch(getAnswerQuestion(data));
            });
    }catch (e) {
        console.log(e)
    }
};
