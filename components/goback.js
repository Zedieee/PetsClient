import {useRouter} from 'next/router'

export default function goBack({name}) {
    const router = useRouter()
    const handelClick = (e) => {
        router.push({
            pathname: '/',
        })
    }

    return (
        <div onClick={handelClick}>
        <h1>&larr; {name ? name : ""}</h1>
        </div>
    )
}