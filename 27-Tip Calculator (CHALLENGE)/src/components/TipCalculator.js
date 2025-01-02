import { useState } from "react";
import Bill from "./Bill";
import Output from "./Output";
import Reset from "./Reset";
import SelectPercentage from "./SelectPercentage";

export default function TipCalculator() {
    const [bill, setBill] = useState(0);
    const [percentage1, setPercentage1] = useState(0);
    const [percentage2, setPercentage2] = useState(0);
    const tip = bill *((percentage1 + percentage2)/2 /100);
    function handleReset(){
    setBill(0);
    setPercentage1(0);
    setPercentage2(0);
    }
    return (
         <>
    <Bill bill={bill} onSetBill={setBill}>How much was the bill? </Bill>
    <SelectPercentage percentage={percentage1} onSelect={setPercentage1} >How did you like the service? </SelectPercentage> 
    <SelectPercentage percentage={percentage2} onSelect={setPercentage2}>How did your friend liked the service? </SelectPercentage> 
    {bill > 0 &&  ( <><Output bill={bill} tip= {tip}/>
    <Reset onHandleReset={handleReset}/></>)}
    </>
    );
}