import React from "react";
import CouponsItem from "../../components/coupons/couponsItem/CouponsItem";
import {MainLayout} from "../../components/MainLayout";
import {
  couponsPagination,
  fetchCouponsByCategory,
  fetchMoreCoupons,
  fetchSortByCategory,
} from "../../store/actions/coupons";
import {useDispatch, useSelector} from "react-redux";
import CouponsLoading from "../../components/coupons/couponsItem/CouponsLoading";
import SubcategorySortBy from "../../components/subcategorySortBy/subcategorySortBy";
import {useRouter} from 'next/router'

const Category = () => {
  const items = useSelector(({coupons: {items}}) => items ?? []);
  const currentPage = useSelector(({coupons}) => coupons.currentPage);
  const isLoaded = useSelector(({coupons}) => coupons.isLoaded);
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const {query: {id, title, category}} = useRouter()
  const [activeSort, setActiveSort] = React.useState(false)


  React.useEffect(() => {
    if (id) {
      dispatch(fetchCouponsByCategory({id, category, page}));
    }
  }, [id]);

  React.useEffect(() => {
    if (page > 1) {
      dispatch(couponsPagination(id, category, page));
    }
  }, [page]);

  const moreCouponsHandler = () => {
    setPage(page + 1);
  };

  const onSelectSortBy = (arg) => {
    dispatch(fetchSortByCategory({
      title: arg,
      id: id
    }))
    setActiveSort(!activeSort)
  };

  return (
    <MainLayout>
      <div className="coupons">
        <div className="container">
          <div className="title-block">
            <h3 className="title-box">{title}</h3>
            <div className="sort-block">
              <div className="sort-button" onClick={() => setActiveSort(!activeSort)}>Сортировать по ▾
              </div>
              {
                activeSort ? <SubcategorySortBy
                  onSelectSortBy={onSelectSortBy}
                  activeSort={activeSort}
                  closeSort={() => setActiveSort(false)}/> : null
              }
            </div>
          </div>
          <div className="category-list">
            {/*Лист категорий*/}
          </div>
          <div className="coupons-list">
            {isLoaded
              ? items.results.map((item) => (
                <CouponsItem
                  key={item.id}
                  {...item}
                />
              ))
              : Array(8)
                .fill(0)
                .map((_, index) => <CouponsLoading key={index}/>)}
          </div>
          <div>
            {
              items.count !== items.results.length
                ?
                <div className="coupons-show-more">
                  <a className="btn-load-more" onClick={moreCouponsHandler}>Загрузить еще</a>
                </div>
                :
                null
            }
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Category;
