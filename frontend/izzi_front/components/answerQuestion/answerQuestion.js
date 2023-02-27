import React, {useEffect} from 'react';
import Link from "next/link";
import FooterSideBarLeftSide from "../../pages/footerSideBarLeftSide";
import { fetchAnswerQuestion } from '../../store/actions/answerQuestions';
import AnswerQuestionText from './answerQuestionText';
import { useSelector, useDispatch } from "react-redux";


const AnswerQuestion = () => {

    const dispatch = useDispatch();
    const AnswerQuestionitems = useSelector(({ answerQuestion }) => answerQuestion.AnswerQuestionitems);
    const isLoaded = useSelector(({answerQuestion }) => answerQuestion.isLoaded);
    useEffect(() => {
      dispatch(fetchAnswerQuestion());
    }, []);

    return (
        <main className="Вопросы и ответы">
            <div className="main-sub-menu__page background-grey">
                <div className="crumb">
                    <div className="container">
                        <div className="crumb-list">
                            <Link href="/">
                                <a className="crumb-item">Главная</a>
                            </Link>
                            <span className="crumb-item">Вопросы и ответы</span>
                        </div>
                    </div>
                </div>
                <div className="main-sub-menu__wrapper">
                    <div className="container">
                        <div className="main-sub-menu__content" id="tabs-main-sub-menu">
                           <FooterSideBarLeftSide/>
                            <div className="main-sub-menu__right">
                                <div className="main-sub-menu__right-inner">
                                    <div className="main-sub-menu-content" id="tabs-main-sub-menu-1">
                                        <h3 className="title-box">Вопросы и ответы</h3>
                                        <div className="about-us__accordion-wrapper">
                                            {isLoaded ? AnswerQuestionitems.map((item) => (
                                            <AnswerQuestionText {...item}/>
                                        )): null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AnswerQuestion;