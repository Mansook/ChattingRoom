import React, { useEffect, useState } from "react";

const Test = ({ Key, filterText }) => {
    const [inputValue, setInputValue] = useState("");
    const [filteredData, setFilteredData] = useState();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleFilter = async() => {
        var input={};
        input.id=Key;
        input.text=inputValue;
        await filterText(input).then(res=>setFilteredData(res.data));
        console.log(filteredData);
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter data..."
            />
            <button onClick={handleFilter}>Filter</button>
            <h3>{filteredData}</h3>
        </div>
    );
};

export default Test;