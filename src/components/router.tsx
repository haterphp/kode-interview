import {RouteObject, useRoutes} from "react-router-dom";
import {FC, lazy, Suspense} from "react";

/**
 * Page lazy loading
 * @param Component
 * @constructor
 */
const Loader = (Component: FC) => (props: any) => (
    <Suspense fallback={<></>}>
        <Component {...props} />
    </Suspense>
)


/**
 * Pages
 */
const IndexPage = Loader(lazy(() => import('./pages/index')))
const ShowPage = Loader(lazy(() => import('./pages/[id]')))


/**
 * Router
 */

const routes: RouteObject[] = [
    { path: "/", element: <IndexPage/> },
    { path: "/recipe/:id", element: <ShowPage/> }
];

export const RouterProvider = () => {
    return useRoutes(routes);
}
