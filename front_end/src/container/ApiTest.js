import React, { useEffect, useState } from "react";
import ApiTest from "../component/ApiTest";
import { useLocation, useSearchParams } from "react-router-dom";
import { GenerateKey } from "../lib/api/filter";
import { filter_text } from "../lib/api/filter";

const TestContainer=()=>{
    const[key,setKey]=useState("");
    useEffect(()=>{
        setKey(GenerateKey("minseok"));
    },[]);

    return(
        <ApiTest
        Key={key}
        filterText={filter_text}/>
    )

};
export default TestContainer;