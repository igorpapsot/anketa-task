import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage({ errorMessageProp }: { errorMessageProp?: string }) {
    const error = errorMessage();
    console.error(error);

    if (errorMessageProp) {
        return (
            <div id="error-page">
                <h1>Oops!</h1>
                <p>
                    <i>{errorMessageProp}</i>
                </p>
            </div>
        )
    }

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error}</i>
            </p>
        </div>
    );
}

function errorMessage() {
    let error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <p>
                {error.status} {error.statusText}
            </p>
        );
    } else if (error instanceof Error) {
        return error.message;
    } else if (typeof error === "string") {
        return error;
    } else {
        console.log(error);
        return "Unknown error";
    }
}