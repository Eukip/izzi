import React from "react";
import CouponsItem from "../components/coupons/couponsItem/CouponsItem";
import {MainLayout} from "../components/MainLayout";
import {fetchAllCoupons, fetchMoreCoupons, fetchSortBy,} from "../store/actions/coupons";
import {useDispatch, useSelector} from "react-redux";
import CouponsLoading from "../components/coupons/couponsItem/CouponsLoading";

const coupons = () => {
  const {items, currentPage, isLoaded} = useSelector(({coupons}) => coupons)
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAllCoupons(currentPage));
  }, []);

  const moreCouponsHandler = () => {
    dispatch(fetchMoreCoupons({
      currentPage: currentPage + 1,
    }))
  }
  const [activeSort, setActiveSort] = React.useState(false)

  const onSelectSortBy = (arg) => {
    dispatch(fetchSortBy(arg))
    setActiveSort(!activeSort)
  }
  return (
    <MainLayout title={"Все купоны"}>
      <div className="coupons">
        <div className="container">
          <div className="title-block">
            <h3 className="title-box">Все купоны</h3>
            <div className="sort-block">
              <div className="sort-button" onClick={() => setActiveSort(!activeSort)}>Сортировать по ▾</div>
              <div className="sort-content" style={{display: activeSort ? "block" : "none"}}>
                <div className="sort-content__inner">
                  <a onClick={() => onSelectSortBy('-created_at')}>По алфавиту</a>
                  <a onClick={() => onSelectSortBy('price')}>По цене (низкая > высокая)</a>
                  <a onClick={() => onSelectSortBy('-price')}>По цене (высокая > низкая)</a>
                </div>
              </div>
            </div>
          </div>
          <div className="coupons-list">
            {isLoaded ? items && items.results.map((item) => (
              <CouponsItem
                key={item.id}
                {...item}
              />
            ))
              : Array(8)
                .fill(0)
                .map((_, index) => <CouponsLoading key={index}/>)}
          </div>
          {
            items.count !== items.results.length
              ?
              <div className="coupons-show-more">
                <a
                  className="btn-load-more"
                  onClick={moreCouponsHandler}
                >
                  Загрузить еще
                </a>
              </div>
              :
              null
          }
        </div>
      </div>
    </MainLayout>
  );
};

export default coupons;

