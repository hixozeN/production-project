import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { routeConfig } from "shared/config/routeConfig/routeConfig"

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {Object.values(routeConfig).map(({ element, path }) => {
            return (
              <Route path={path} element={element} key={path} />
            )
          })}
        </Routes>
      </Suspense>
  )
}

export default AppRouter;