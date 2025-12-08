// This file runs early to suppress known warnings and errors
// It's automatically loaded by Docusaurus from src/clientModules/

if (typeof window !== 'undefined') {
    // Suppress ResizeObserver errors
    const resizeObserverLoopErr = "ResizeObserver loop completed with undelivered notifications.";
    const resizeObserverLoopLimitErr = "ResizeObserver loop limit exceeded";

    window.addEventListener("error", (e) => {
        if (e.message && (e.message.includes(resizeObserverLoopErr) || e.message.includes(resizeObserverLoopLimitErr))) {
            e.stopImmediatePropagation();
            e.preventDefault();
        }
    });

    // Helper function to check if any argument contains known warnings to suppress
    const shouldSuppressWarning = (args) => {
        return args.some(arg => {
            if (typeof arg === 'string') {
                // LoadableComponent contextTypes warning
                if (arg.includes('LoadableComponent uses the legacy contextTypes API') ||
                    arg.includes('legacy contextTypes API') ||
                    (arg.includes('LoadableComponent') && arg.includes('contextTypes'))) {
                    return true;
                }
                // React key prop spread warning
                if (arg.includes('A props object containing a "key" prop is being spread into JSX') ||
                    (arg.includes('key') && arg.includes('prop is being spread into JSX')) ||
                    (arg.includes('React keys must be passed directly to JSX'))) {
                    return true;
                }
            }
            // Also check error objects
            if (arg && typeof arg === 'object') {
                try {
                    const argStr = JSON.stringify(arg);
                    // LoadableComponent warning
                    if (argStr.includes('LoadableComponent') && argStr.includes('contextTypes')) {
                        return true;
                    }
                    // Key prop warning
                    if (argStr.includes('key') && argStr.includes('prop is being spread')) {
                        return true;
                    }
                } catch (e) {
                    // Ignore JSON stringify errors
                }
            }
            return false;
        });
    };

    // Suppress known warnings - intercept console.error early
    const originalConsoleError = console.error;
    console.error = function (...args) {
        if (shouldSuppressWarning(args)) {
            return; // Suppress the warning
        }
        originalConsoleError.apply(console, args);
    };

    // Also intercept console.warn in case the warning comes through there
    const originalConsoleWarn = console.warn;
    console.warn = function (...args) {
        if (shouldSuppressWarning(args)) {
            return; // Suppress the warning
        }
        originalConsoleWarn.apply(console, args);
    };

    // Intercept React's internal warning system if available
    if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
        const originalOnCommitFiberRoot = window.__REACT_DEVTOOLS_GLOBAL_HOOK__.onCommitFiberRoot;
        if (originalOnCommitFiberRoot) {
            window.__REACT_DEVTOOLS_GLOBAL_HOOK__.onCommitFiberRoot = function (...args) {
                // This won't suppress warnings but ensures devtools still work
                return originalOnCommitFiberRoot.apply(this, args);
            };
        }
    }
}
