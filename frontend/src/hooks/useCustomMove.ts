import { useState } from "react"
import { createSearchParams, useNavigate, useSearchParams } from "react-router"

const useCustomMove = (): UseCustomMoveReturn => {
  const navigate = useNavigate()
  const [refresh, setRefresh] = useState<boolean>(false)
  const [queryParams] = useSearchParams()

  const pageStr: string | null = queryParams.get('page')
  const sizeStr: string | null = queryParams.get('size')

  const page: number = pageStr ? Number(pageStr) : 1
  const size: number = sizeStr ? Number(sizeStr) : 10

  const queryDefault = createSearchParams({
    page: String(page),
    size: String(size),
  }).toString()

  const moveToList = (pageParam?: PageParam) => {
    let queryStr = ''

    if (pageParam) {
      const pageNum = Number(pageParam.page) || 1
      const sizeNum = Number(pageParam.size) || 10
      queryStr = createSearchParams({
        page: String(pageNum),
        size: String(sizeNum),
      }).toString()
    } else {
      queryStr = queryDefault
    }

    // 같은 페이지를 다시 누르면 목록을 새로 불러오도록 refresh 값을 바꿈
    if (queryStr === queryDefault) {
      setRefresh(!refresh)
    }

    navigate({ pathname: `../list`, search: queryStr })
  }

  const moveToModify = (num: number) => {
    navigate({ pathname: `../modify/${num}`, search: queryDefault })
  }

  const moveToRead = (num: number) => {
    navigate({ pathname: `../read/${num}`, search: queryDefault })
  }

  return { moveToList, moveToModify, moveToRead, page, size, refresh }
}

export default useCustomMove