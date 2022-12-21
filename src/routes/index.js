import React from 'react';
import { Routes, Route } from "react-router-dom";
import {pathList} from "./path";

import UserRoutes from "./UserRoutes";

import MainPage from "../pages/MainPage";
import LegalPage from "../pages/LegalPage";
import StudioPage from "../pages/StudioPage";
import CanvasPage from "../pages/CanvasPage";

const Routers = () => {
    return (
        <>
            <Routes>
                <Route path={pathList.mainPage.path} element={<UserRoutes element={MainPage}/>}/>
                <Route path={pathList.studio.path} element={<UserRoutes element={StudioPage}/>}/>
                <Route path={pathList.canvas.path} element={<UserRoutes element={CanvasPage}/>}/>
                <Route path={pathList.privacy.path} element={<UserRoutes element={LegalPage} page="privacy"/>}/>
                <Route path={pathList.terms.path} element={<UserRoutes element={LegalPage} page="terms"/>}/>
                <Route path={pathList.disclaimer.path} element={<UserRoutes element={LegalPage} page="disclaimer"/>}/>
                <Route path={pathList.cookies.path} element={<UserRoutes element={LegalPage} page="cookies"/>}/>
                <Route path="*" element={<UserRoutes element={MainPage}/>}/>
            </Routes>
        </>
    );
};

export default Routers;