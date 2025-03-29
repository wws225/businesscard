import { Cards } from "@/pages/Cards";
import { Register } from "@/pages/Register";
import { Top } from "@/pages/Top";
import { FC, memo } from "react";
import { Route, Routes, } from "react-router-dom";

export const Router: FC = memo(() => {

    return (
        <Routes>
            <Route path="/" element={<Top />}/>
            <Route path="/cards/:subpath/*" element={<Cards />} />
            <Route path="/cards/register" element={<Register />} />
        </Routes>
    )
})