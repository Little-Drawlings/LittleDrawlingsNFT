import React, {useEffect} from 'react';
import Privacy from "./Privacy";
import TermsAndConditions from "./TermsAndConditions";
import Disclaimer from "./Disclaimer";
import Cookies from "./Cookies";

const Legal = ({page}) => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (page === "privacy") return <Privacy/>;
    if (page === "terms") return <TermsAndConditions/>;
    if (page === "disclaimer") return <Disclaimer/>;
    if (page === "cookies") return <Cookies/>;

    return <div/>;
};

export default Legal;