import React from "react";
import { MainLayout } from "../../components/MainLayout";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import CompanyDetailComponent from "../../components/companyDetail/CompanyDetailComponent";
import {fetchCompany} from "../../store/actions/company";

export default function company() {
    const router = useRouter();
    const dispatch = useDispatch();
    const items = useSelector(({ company }) => company.items);
    const id = router.query.id
    React.useEffect(() => {
        dispatch(fetchCompany(id || window.location.pathname.split("/").pop()))
    }, []);

    return (
        <MainLayout>
            <CompanyDetailComponent {...items}/>
        </MainLayout>
    );

}
