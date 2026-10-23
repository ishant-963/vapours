import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

const RouterContext = createContext(null);

function matchRoute(routePath, currentPath) {
  // Normalize paths: strip query parameters and hashes, remove trailing slash
  const cleanPath = (currentPath || "/").split("?")[0].replace(/^#/, "") || "/";
  const normCurrent = cleanPath.replace(/\/+$/, "") || "/";
  const normRoute = (routePath || "").replace(/\/+$/, "") || "/";

  if (normRoute === "*") {
    return { matches: true, params: {} };
  }

  const routeSegments = normRoute.split("/").filter(Boolean);
  const currentSegments = normCurrent.split("/").filter(Boolean);

  if (routeSegments.length !== currentSegments.length) {
    return { matches: false, params: {} };
  }

  const params = {};
  for (let i = 0; i < routeSegments.length; i++) {
    const rSeg = routeSegments[i];
    const cSeg = currentSegments[i];

    if (rSeg.startsWith(":")) {
      const paramName = rSeg.slice(1);
      params[paramName] = decodeURIComponent(cSeg);
    } else if (rSeg !== cSeg) {
      return { matches: false, params: {} };
    }
  }

  return { matches: true, params };
}

export function createBrowserRouter(routes) {
  return { routes };
}

function getCurrentPath() {
  if (typeof window === "undefined") return "/";
  if (window.location.hash) {
    const hash = window.location.hash.slice(1);
    return hash.startsWith("/") ? hash : "/" + hash;
  }
  return window.location.pathname || "/";
}

export function RouterProvider({ router }) {
  const [pathname, setPathname] = useState(getCurrentPath);

  useEffect(() => {
    const handleLocationChange = () => {
      setPathname(getCurrentPath());
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  const navigate = (to, options = {}) => {
    const target = to.startsWith("/") ? to : "/" + to;
    if (window.location.hash || options.hash) {
      window.location.hash = target;
    } else {
      if (options.replace) {
        window.history.replaceState({}, "", target);
      } else {
        window.history.pushState({}, "", target);
      }
      setPathname(target);
    }
    window.scrollTo(0, 0);
  };

  // Resolve matching route
  const rootRoute = router.routes[0];
  const children = rootRoute?.children || [];

  let matchedChild = null;
  let params = {};

  for (const child of children) {
    if (child.index && (pathname === "/" || pathname === "")) {
      matchedChild = child;
      break;
    }
    if (child.path) {
      const check = matchRoute(child.path.startsWith("/") ? child.path : "/" + child.path, pathname);
      if (check.matches) {
        matchedChild = child;
        params = check.params;
        break;
      }
    }
  }

  if (!matchedChild) {
    const wildcard = children.find((c) => c.path === "*");
    if (wildcard) {
      matchedChild = wildcard;
    }
  }

  const contextValue = useMemo(
    () => ({
      pathname,
      navigate,
      params,
      matchedChild,
    }),
    [pathname, params, matchedChild]
  );

  return (
    <RouterContext.Provider value={contextValue}>
      {rootRoute?.element || matchedChild?.element || null}
    </RouterContext.Provider>
  );
}

export function Outlet() {
  const ctx = useContext(RouterContext);
  if (!ctx || !ctx.matchedChild) return null;
  return ctx.matchedChild.element;
}

export function useLocation() {
  const ctx = useContext(RouterContext);
  return {
    pathname: ctx ? ctx.pathname : getCurrentPath(),
    search: "",
    hash: "",
  };
}

export function useParams() {
  const ctx = useContext(RouterContext);
  return ctx ? ctx.params : {};
}

export function useNavigate() {
  const ctx = useContext(RouterContext);
  return ctx ? ctx.navigate : () => {};
}

export function Link({ to, children, className = "", onClick, style, ...props }) {
  const { navigate } = useContext(RouterContext) || { navigate: () => {} };

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      if (to && to.startsWith("#")) {
        return;
      }
      e.preventDefault();
      navigate(to);
    }
  };

  // Ensure style is strictly an object to avoid React 19 setValueForStyles crash
  const safeStyle = (style && typeof style === "object") ? style : undefined;

  return (
    <a href={to} className={className} style={safeStyle} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

export function NavLink({ to, children, className, style, end = false, ...props }) {
  const { pathname } = useLocation();
  const isActive = end
    ? pathname === to
    : pathname === to || (to !== "/" && pathname.startsWith(to));

  const resolvedClassName = typeof className === "function" ? className({ isActive }) : (className || "");
  const resolvedStyle = typeof style === "function" ? style({ isActive }) : style;
  const resolvedChildren = typeof children === "function" ? children({ isActive }) : children;

  return (
    <Link to={to} className={resolvedClassName} style={resolvedStyle} {...props}>
      {resolvedChildren}
    </Link>
  );
}

export function Navigate({ to, replace = false }) {
  const { navigate } = useContext(RouterContext) || { navigate: () => {} };

  useEffect(() => {
    navigate(to, { replace });
  }, [to, replace, navigate]);

  return null;
}
