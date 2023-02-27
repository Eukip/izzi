import React, {useEffect} from "react";

const SubSubcategorySortBy = ({onSelectSortBy, activeSort, closeSort}) => {

    useEffect(() => {
        document.addEventListener('click', closeSort)
        return () => document.removeEventListener('click', closeSort)
    })

    return (
        <div className="sort-content" style={{display: activeSort ? "block" : "none"}}>
            <div className="sort-content__inner">
                <a onClick={() => onSelectSortBy('-created_at')}>По алфавиту</a>
                <a  onClick={() => onSelectSortBy('price')}>По цене (низкая > высокая)</a>
                <a  onClick={() => onSelectSortBy('-price')}>По цене (высокая > низкая)</a>
            </div>
        </div>
    )
}

export default SubSubcategorySortBy;