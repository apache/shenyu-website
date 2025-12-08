// Error suppression script - runs early to catch warnings before they appear
(function () {
    'use strict';
    if (typeof window === 'undefined') return;

    // Suppress ResizeObserver errors
    var resizeObserverLoopErr = "ResizeObserver loop completed with undelivered notifications.";
    var resizeObserverLoopLimitErr = "ResizeObserver loop limit exceeded";

    window.addEventListener("error", function (e) {
        if (e.message && (e.message.indexOf(resizeObserverLoopErr) >= 0 || e.message.indexOf(resizeObserverLoopLimitErr) >= 0)) {
            e.stopImmediatePropagation();
            e.preventDefault();
        }
    });

    // Helper function to check if any argument contains known warnings to suppress
    function shouldSuppressWarning (args) {
        for (var i = 0; i < args.length; i++) {
            var arg = args[i];
            if (typeof arg === 'string') {
                // LoadableComponent contextTypes warning
                if (arg.indexOf('LoadableComponent uses the legacy contextTypes API') >= 0 ||
                    arg.indexOf('legacy contextTypes API') >= 0 ||
                    (arg.indexOf('LoadableComponent') >= 0 && arg.indexOf('contextTypes') >= 0)) {
                    return true;
                }
                // React key prop spread warning
                if (arg.indexOf('A props object containing a "key" prop is being spread into JSX') >= 0 ||
                    (arg.indexOf('key') >= 0 && arg.indexOf('prop is being spread into JSX') >= 0) ||
                    arg.indexOf('React keys must be passed directly to JSX') >= 0) {
                    return true;
                }
            }
            // Also check error objects
            if (arg && typeof arg === 'object') {
                try {
                    var argStr = JSON.stringify(arg);
                    // LoadableComponent warning
                    if (argStr.indexOf('LoadableComponent') >= 0 && argStr.indexOf('contextTypes') >= 0) {
                        return true;
                    }
                    // Key prop warning
                    if (argStr.indexOf('key') >= 0 && argStr.indexOf('prop is being spread') >= 0) {
                        return true;
                    }
                } catch (e) {
                    // Ignore JSON stringify errors
                }
            }
        }
        return false;
    }

    // Suppress known warnings - intercept console.error early
    var originalConsoleError = console.error;
    console.error = function () {
        var args = Array.prototype.slice.call(arguments);
        if (shouldSuppressWarning(args)) {
            return; // Suppress the warning
        }
        originalConsoleError.apply(console, args);
    };

    // Also intercept console.warn
    var originalConsoleWarn = console.warn;
    console.warn = function () {
        var args = Array.prototype.slice.call(arguments);
        if (shouldSuppressWarning(args)) {
            return; // Suppress the warning
        }
        originalConsoleWarn.apply(console, args);
    };
})();
