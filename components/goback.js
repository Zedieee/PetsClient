import {useRouter} from 'next/router'

export default function goBack({name}) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
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