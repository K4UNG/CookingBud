import Popular from "../Popular/Popular"

export default function Results({data}) {
    return (
        <>
            {data.map(item => {
                return <Popular key={item.id} recipe={item} />
            })}
        </>
    )
}