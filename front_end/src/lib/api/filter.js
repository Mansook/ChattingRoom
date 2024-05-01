import client from "./client";

//generate Key
export const GenerateKey = async(name) => {
    var req = {};
    req.name=name;
    const response = await client.post("api/generate_key_post",req);
    console.log(response.data);
// "name" 속성 추가
    return response.data;
};

export const filter_text=async(input)=>{
   
    const response=await client.post("/api/filter_text",input);
    console.log(response.data);
    return response.data;
}