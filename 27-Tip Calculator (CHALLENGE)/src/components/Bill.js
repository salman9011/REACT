export default function Bill({children, bill, onSetBill}) {
    return <>
    <span>{children}</span>
    <input type ="text" placeholder="Enter bill..." value={bill} onChange={e=>onSetBill(Number(e.target.value))} />
    </>
}