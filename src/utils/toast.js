export function toastSuccess(toast, message) {
    return (
        toast({
            variant: "left-accent",
            status: "success",
            position: 'top-right',
            title: message,
            isClosable: true,
        })
    );
}
export function toastInfo(toast, message) {
    return (
        toast({
            variant: "left-accent",
            status: "info",
            position: 'top-right',
            title: message,
            isClosable: true,
        })
    );
}
export function toastError(toast, message) {
    return (
        toast({
            variant: "left-accent",
            status: "error",
            position: 'top-right',
            title: message,
            isClosable: true,

        })
    );
}
export function toastWarning(toast, message) {
    return (
        toast({
            variant: "left-accent",
            status: "warning",
            position: 'top-right',
            title: message,
            isClosable: true,
        })
    );
}

